const express = require('express')
const router = express.Router()
const restaurantController = require('../../controllers/api/restaurant-controller')
const { authenticatorAdmin } = require('../../middleware/auth')

// get all restaurants
router.get('/', restaurantController.getRestaurants)

// create new restaurant - admin only
router.post('/', authenticatorAdmin, restaurantController.postRestaurant)

// get a restaurant
router.get('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  res.send(`show certain restaurant. id : ${id}`)
})

// update a restaurant - admin only
router.put('/:restaurant_id', authenticatorAdmin, (req, res) => {
  res.send('update information of a restaurant')
})

// delete a restaurant - admin only
router.delete('/:restaurant_id', authenticatorAdmin, (req, res) => {
  res.send('delete a restaurant')
})

// ------ menu, dishes -------- //

// create dishes - admin only
router.post('/:restaurant_id/dishes', authenticatorAdmin, restaurantController.postDishes)

// update a dish - admin only
router.put('/dishes/:dish_id', authenticatorAdmin, restaurantController.putDish)

// delete a dish - admin only
router.delete('/dishes/:dish_id', authenticatorAdmin, restaurantController.deleteDish)

module.exports = router