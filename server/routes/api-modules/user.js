const express = require('express')
const router = express.Router()
const userController = require('../../controllers/api/user-controller')
const { authenticator, authenticatorAdmin } = require('../../middleware/auth')

// get user list
router.get('/', authenticator, authenticatorAdmin, (req, res) => res.send('user list'))

// register
router.post('/', userController.signUp)

// login
router.post('/login', userController.login)

// get user profile
router.get('/:user_id', authenticator, userController.getUser)

// update user profile
router.put('/:user_id', authenticator, userController.putUser)

// -------- user orders --------- //

// create user order
router.post('/orders', authenticator, (req, res) => {
  res.send('create new user order')
})

// get all orders
router.get('/orders', authenticator, (req, res) => {
  res.send('get all user orders')
})

// revise order
router.put('/orders/:order_id', authenticator, (req, res) => {
  res.send('revise order details')
})

// delete order
router.delete('/orders/:order_id', authenticator, (req, res) => {
  res.send('cancel order')
})

module.exports = router