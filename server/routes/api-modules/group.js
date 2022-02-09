const express = require('express')
const router = express.Router()

// create a new group
router.post('/', (req, res) => {
  res.send('create a new group')
})

// get all food ordering group
router.get('/', (req, res) => {
  res.send('list of food ordering group')
})

// get restaurant and menu info of a group
router.get('/:group_id', (req, res) => {
  res.send('show menu of a food ordering group')
})

// update info of a food ordering group
router.put('/:group_id', (req, res) => {
  res.send('update group order')
})

// delete a food ordering group
router.delete('/:group_id', (req, res) => {
  res.send('delete group order')
})

// get order details of a food ordering group
router.get('/orders/:group_id', (req, res) => {
  res.send('order details: total qty, total price, restaurant-tel... ')
})

module.exports = router