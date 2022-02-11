const { Restaurant } = require('../../models')

const restaurantController = {
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
  }
}

module.exports = restaurantController