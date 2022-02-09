const express = require('express')
const router = express.Router()

// get user list
router.get('/', (req, res) => {
  res.send('user list')
})

// register
router.post('/', (req, res) => {
  res.send('registration - create user')
})

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