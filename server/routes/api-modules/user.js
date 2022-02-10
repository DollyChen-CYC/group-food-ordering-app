const express = require('express')
const router = express.Router()
const userController = require('../../controllers/api/user-controller')

// get user list
router.get('/', userController.getUsers)

// register
router.post('/', userController.signUp)

// login
router.post('/login', (req, res) => {
  res.send('user login')
})

// get user profile
router.get('/:user_id', (req, res) => {
  res.send('user profile')
})

// update user profile
router.put('/:user_id', (req, res) => {
  res.send('modify user profile')
})

// -------- user orders --------- //

// create user order
router.post('/orders', (req, res) => {
  res.send('create new user order')
})

// get all orders
router.get('/orders', (req, res) => {
  res.send('get all user orders')
})

// revise order
router.put('/orders/:order_id', (req, res) => {
  res.send('revise order details')
})

// delete order
router.delete('/orders/:order_id', (req, res) => {
  res.send('cancel order')
})

module.exports = router