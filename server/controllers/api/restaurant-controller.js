const { Restaurant, Dish } = require('../../models')

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
      .then(restaurants => res.json({ status: 'success', message: 'OK', data: { restaurants } }))
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

    Dish.findByPk(dishId)
      .then(dish => {
        if (!dish) return res.json({ status: 'error', message: 'dish does not exist!' })
        if (!name || !price) return res.json({ status: "error", message: "Some required fields are empty." })

        return dish.update({ name, price, description })
      })
      .then(dish => res.json({ status: "success", message: `Dish (${dish.name}) is updated.` }))
      .catch(err => {
        console.log('Failed to update dish', err)
        return res.status(500).json({ status: "error", message: "Failed to update dish info." })
      })
  }
}

module.exports = restaurantController