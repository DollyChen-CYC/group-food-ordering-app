const { Restaurant, Dish } = require('../../models')
const sequelize = require('sequelize')

const restaurantController = {
  deleteDish: (req, res) => {
    const dishId = req.params.dish_id

    Dish.findByPk(dishId)
      .then(dish => {
        if (!dish) return res.json({ status: 'error', message: 'dish does not exist!' })
        return dish.destroy()
      })
      .then(dish => {
        return res.json({ status: "success", message: `${dish.name} (ID: ${dish.id}) is successfully deleted.` })
      })
      .catch(err => {
        console.log('Failed to delete dish', err)
        return res.status(500).json({ status: "error", message: "Failed to delete dish." })
      })
  },
  deleteRestaurant: (req, res) => {
    const restaurantId = req.params.restaurant_id
    Restaurant.findByPk(restaurantId)
      .then(restaurant => {
        if (!restaurant) return res.json({ status: "error", message: "Restaurant does not exist." })
        return restaurant.destroy()
      })
      .then(restaurant => {
        return res.json({ status: "success", message: `Restaurant (ID: ${restaurant.id}) is deleted successfully.` })
      })
      .catch(err => {
        console.log(`-- Failed to delete restaurant --`)
        return res.status(500).json({ status: "error", message: "Failed to delete restaurant." })
      })
  },
  getRestaurant: (req, res) => {
    const restaurantId = req.params.restaurant_id

    Restaurant.findByPk(restaurantId, {
      attributes: [
        'name',
        'description',
        'image',
        'telephone',
      ],
      include: [{ model: Dish, as: 'Dishes', attributes: ['id', 'name', 'price', 'description'] }]
    })
      .then(restaurant => {
        if (!restaurant) return res.json({ status: "error", message: "Restaurant does not exist." })

        return res.json({ status: "success", message: "ok", data: { restaurant } })
      })
      .catch(err => {
        console.log('-- Failed to get restaurant info --', err)
        return res.status(500).json({ status: "error", message: "Failed to get restaurant info" })
      })
  },
  getRestaurants: (req, res) => {
    Restaurant.findAll({
      raw: true,
      nest: true,
      attributes: [
        'id',
        'name',
        'description',
        'image',
        'telephone'
      ]
    })
      .then(restaurants => res.json({ status: 'success', message: 'ok', data: { restaurants } }))
      .catch(err => {
        console.log('-- Failed to get restaurants --', err)
        return res.status(500).json({ status: 'error', message: 'Failed to get restaurants' })
      })
  },
  postDishes: (req, res) => {
    const restaurantId = req.params.restaurant_id
    const dishes = req.body.dishes.map(dish => {
      const { name, price } = dish
      // confirm all required fields are filled
      if (!name || !price) return res.json({ status: "error", message: "Some required fields are empty." })

      return {
        ...dish,
        restaurantId
      }
    })

    Dish.bulkCreate(dishes)
      .then(dishes => res.json({ status: "success", message: "Successfully add dishes.", data: { dishes } }))
      .catch(err => {
        console.log('-- Failed to create new dishes --', err)
        res.status(500).json({ status: "error", message: "Failed to create new dishes" })
      })
  },
  postRestaurant: (req, res) => {
    const { name, description, image, telephone } = req.body
    if (!name) return res.json({ status: "error", message: "Restaurant name is required." })

    Restaurant.findOne({ where: { name } })
      .then(restaurant => {
        if (restaurant) return res.json({ status: 'error', message: 'Restaurant name is already exist.' })
        return Restaurant.create({
          name,
          description,
          image,
          telephone
        })
      })
      .then(restaurant => {
        const restaurantId = restaurant.id
        return res.json({ status: 'success', message: 'Created successfully', data: { restaurantId } })
      })
      .catch(err => {
        console.log('-- Restaurant Update Failed -- ', err)
        return res.status(500).json({ status: 'error', message: 'Restaurant Update Failed' })
      })
  },
  putDish: (req, res) => {
    const dishId = req.params.dish_id
    const { name, price, description } = req.body
    if (!name || !price) return res.json({ status: "error", message: "Some required fields are empty." })

    Dish.findByPk(dishId)
      .then(dish => {
        if (!dish) return res.json({ status: 'error', message: 'dish does not exist!' })
        return dish.update({ name, price, description })
      })
      .then(dish => res.json({ status: "success", message: `Dish (${dish.name}) is updated.` }))
      .catch(err => {
        console.log('Failed to update dish', err)
        return res.status(500).json({ status: "error", message: "Failed to update dish info." })
      })
  },
  putRestaurant: (req, res) => {
    const restaurantId = req.params.restaurant_id
    const { name, description, image, telephone } = req.body
    if (!name || !telephone) return res.json({ status: "error", message: "Some required fields are empty." })

    Restaurant.findByPk(restaurantId)
      .then(restaurant => {
        if (!restaurant) return res.json({ status: "error", message: "Restaurant does not exist." })
        return restaurant.update({ name, description, image, telephone })
      })
      .then(restaurant => {
        return res.json({ status: "success", message: `Restaurant (${restaurant.name}) is updated.` })
      })
      .catch(err => {
        console.log('-- Failed to update restaurant info --', err)
        return res.status(500).json({ status: "error", message: "Failed to update restaurant info" })
      })
  }
}

module.exports = restaurantController