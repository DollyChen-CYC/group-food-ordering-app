const { Group_order, Restaurant, Dish, User_order } = require('../../models')
const sequelize = require('sequelize')

const groupController = {
  deleteGroup: (req, res) => {
    const groupId = req.params.group_id

    Group_order.findByPk(groupId)
      .then(group => {
        if (!group) return res.json({ status: "error", message: `Food ordering group (ID: ${groupId}) does not exist.` })
        return group.destroy()
      })
      .then(group => {
        return res.json({ status: "success", message: `Food ordering group (ID: ${group.id}) is successfully deleted.` })
      })
      .catch(err => {
        console.log('-- Failed to delete group --', err)
        return res.status(500).json({ status: "error", message: "Failed to delete group." })
      })
  },
  getGroup: (req, res) => {
    const groupId = req.params.group_id

    Group_order.findByPk(groupId)
      .then(group => {
        if (!group) return res.json({ status: "error", message: `Food ordering group (ID: ${groupId}) does not exist.` })

        // fetch restaurant details and its all dishes
        const { restaurant_id } = group
        Restaurant.findByPk(restaurant_id, {
          include: [{ model: Dish, attributes: ['name', 'price', 'description'] }]
        })
          .then(restaurant => {
            const { id, name, description, image, Dishes: dishes } = restaurant
            // format response data
            const data = {
              group: {
                ...group.toJSON(),
                restaurant: { id, name, description, image },
                dishes
              }
            }
            return res.json({ status: "success", message: "ok", data })
          })
      })
      .catch(err => {
        console.log('-- Failed to get group info --', err)
        return res.status(500).json({ status: "error", message: "Failed to get group info." })
      })
  },
  getGroupOrder: (req, res) => {
    const groupId = +req.params.group_id

    return Promise.all([
      Group_order.findByPk(groupId, {
        include: [{ model: Restaurant, attributes: ['id', 'name', 'description', 'image', 'telephone'] }]
      }),
      // find all orders that belong to this food ordering group
      User_order.findAll({
        raw: true,
        nest: true,
        where: { group_id: groupId },
        attributes: [
          'group_id',
          'dish_id',
          [sequelize.fn('COUNT', sequelize.col('dish_id')), 'qty']
        ],
        group: ['group_id', 'dish_id'],
        include: [
          {
            model: Dish,
            attributes: ['id', 'name', 'price']
          }
        ]
      })
    ])
      .then(results => {
        // format response data
        const data = {
          group: {
            ...results[0].toJSON(),
            orders: results[1]
          }
        }
        return res.json({ status: "success", message: "ok", data })
      })
      .catch(err => {
        console.log('-- Failed to get details of food ordering group --', err)
        return res.status(500).json({ status: 'error', message: 'Failed to get details of food ordering group' })
      })
  },
  getGroups: (req, res) => {
    Group_order.findAll({
      raw: true,
      nest: true,
      include: [{
        model: Restaurant, attributes: ['id', 'name', 'description', 'image']
      }]
    })
      .then(groups => {
        res.json({ status: "success", message: "ok", data: { groups } })
      })
      .catch(err => {
        console.log('-- Failed to get food ordering groups --', err)
        return res.status(500).json({ status: "error", message: "Failed to get food ordering groups." })
      })
  },
  postGroup: (req, res) => {
    const { restaurantId, orderDeadline, orderDeliveryTime, takeMealAt } = req.body

    if (!(restaurantId && orderDeadline && orderDeliveryTime && takeMealAt)) {
      return res.json({ status: "error", message: "Some required fields are empty." })
    }

    Group_order.create({
      restaurant_id: restaurantId,
      order_deadline: orderDeadline,
      order_delivery_time: orderDeliveryTime,
      take_meal_at: takeMealAt
    })
      .then(group => {
        return res.json({
          status: "success",
          message: "Food Ordering Group is successfully created.",
          data: { group: { id: group.id } }
        })
      })
      .catch(err => {
        console.log('-- Failed to create a new food ordering group --', err)
        return res.status(500).json({ status: "error", message: "Failed to create a new food ordering group." })
      })
  },
  putGroup: (req, res) => {
    const groupId = req.params.group_id
    const { orderDeadline, orderDeliveryTime, takeMealAt, orderStatus } = req.body
    if (!(orderDeadline && orderDeliveryTime && takeMealAt && orderStatus)) {
      return res.json({ status: "error", message: "Some required fields are empty." })
    }

    Group_order.findByPk(groupId)
      .then(group => {
        if (!group) return res.json({ status: "error", message: `Food ordering group (ID: ${groupId}) does not exist.` })

        return group.update({
          order_deadline: orderDeadline,
          order_delivery_time: orderDeliveryTime,
          take_meal_at: takeMealAt,
          order_status: orderStatus
        })
      })
      .then(group => res.json({
        status: "success",
        message: `Food ordering group (ID: ${group.id}) is updated.`,
        data: { group: { id: group.id } }
      }))
      .catch(err => {
        console.log('-- Failed to update group info --', err)
        return res.status(500).json({ status: "error", message: "Failed to update group info." })
      })
  },
  putOrderStatus: (req, res) => {
    const groupId = req.params.group_id
    const { orderStatus } = req.body
    if (!orderStatus) return res.json({ status: "error", message: "Order status code is required." })

    Group_order.findByPk(groupId)
      .then(group => {
        if (!group) return res.json({ status: "error", message: `Food ordering group (ID: ${groupId}) does not exist.` })
        group.update({ order_status: orderStatus })
      })
      .then(group => res.json({ status: "success", message: `Order status is updated.` }))
      .catch(err => {
        console.log('-- Failed to update order status of food group --', err)
        return res.status(500).json({ status: "error", message: "Failed to update order status of food group" })
      })
  }
}

module.exports = groupController