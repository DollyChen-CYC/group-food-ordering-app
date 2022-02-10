const express = require('express')
const router = express.Router()
const restaurantController = require('../../controllers/api/restaurant-controller')

// get all restaurants
router.get('/', (req, res) => {
  res.send('restaurant list')
})

// create new restaurant
router.post('/', (req, res) => {
  res.send('create new restaurant')
})

// get a restaurant
router.get('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  res.send(`show certain restaurant. id : ${id}`)
})

// update a restaurant
router.put('/:restaurant_id', (req, res) => {
  res.send('update information of a restaurant')
})

// delete a restaurant
router.delete('/:restaurant_id', (req, res) => {
  res.send('delete a restaurant')
})

// ------ menu, dishes -------- //

// create dishes
router.post('/dishes', (req, res) => {
  res.send('create a dish')
})

// update a dish
router.put('/dishes/:dish_id', (res, req) => {
  res.send('update information of a dish')
})

// delete a dish
router.delete('/dishes/:dish_id', (res, req) => {
  res.send('delete a dish')
})

module.exports = router