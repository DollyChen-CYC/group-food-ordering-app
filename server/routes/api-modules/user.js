const express = require('express')
const router = express.Router()
const userController = require('../../controllers/api/user-controller')
const { authenticator } = require('../../middleware/auth')
const permissionChecker = require('../../middleware/accessPermission')

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
router.post('/orders', authenticator, permissionChecker.accessUserProfile, userController.postUserOrder)

// get all orders
router.get('/:user_id/orders', authenticator, permissionChecker.accessUserProfile, (req, res) => {
  res.send('get all user orders')
})

// revise order
router.put('/orders/:order_id', authenticator, permissionChecker.accessUserProfile, (req, res) => {
  res.send('revise order details')
})

// delete order
router.delete('/orders/:order_id', authenticator, permissionChecker.accessUserProfile, (req, res) => {
  res.send('cancel order')
})

module.exports = router