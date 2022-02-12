const express = require('express')
const router = express.Router()
const userController = require('../../controllers/api/user-controller')
const { authenticator } = require('../../middleware/auth')
const permissionChecker = require('../../middleware/accessPermission')
const { authenticate } = require('passport')

// get user list
router.get('/', authenticator, permissionChecker.admin, (req, res) => res.send('user list'))

// register
router.post('/', userController.signUp)

// login
router.post('/login', userController.login)

// get user profile
router.get('/:user_id', authenticator, permissionChecker.accessUserProfile, userController.getUser)

// update user profile
router.put('/:user_id', authenticator, permissionChecker.accessUserProfile, userController.putUser)

// -------- user orders --------- //

// create user order
router.post('/:user_id/orders', authenticator, permissionChecker.accessUserProfile, userController.postUserOrder)

// get all orders
router.get('/:user_id/orders', authenticator, permissionChecker.accessUserProfile, userController.getUserOrders)

// get certain order - admin use
router.get('/orders/:order_id', authenticator, permissionChecker.admin, userController.getUserOrder)

// delete order - admin only
router.delete('/orders/:order_id', authenticator, permissionChecker.admin, userController.deleteUserOrder)
// delete order - user use
router.delete('/:user_id/orders/:order_id', authenticator, permissionChecker.accessUserProfile, userController.deleteUserOrder)

module.exports = router