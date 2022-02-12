const express = require('express')
const router = express.Router()
const restaurantController = require('../../controllers/api/restaurant-controller')
const permissionChecker = require('../../middleware/accessPermission')

// get all restaurants
router.get('/', restaurantController.getRestaurants)

// create new restaurant - admin only
router.post('/', permissionChecker.admin, restaurantController.postRestaurant)

// get a restaurant
router.get('/:restaurant_id', restaurantController.getRestaurant)

// update a restaurant - admin only
router.put('/:restaurant_id', permissionChecker.admin, restaurantController.putRestaurant)

// delete a restaurant - admin only
router.delete('/:restaurant_id', permissionChecker.admin, restaurantController.deleteRestaurant)

// ------ menu, dishes -------- //

// create dishes - admin only
router.post('/:restaurant_id/dishes', permissionChecker.admin, restaurantController.postDishes)

// update a dish - admin only
router.put('/dishes/:dish_id', permissionChecker.admin, restaurantController.putDish)

// delete a dish - admin only
router.delete('/dishes/:dish_id', permissionChecker.admin, restaurantController.deleteDish)

module.exports = router