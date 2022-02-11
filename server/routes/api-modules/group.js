const express = require('express')
const router = express.Router()
const groupController = require('../../controllers/api/group-controller')
const { authenticatorAdmin } = require('../../middleware/auth')

// create a new group - admin only
router.post('/', authenticatorAdmin, groupController.postGroup)

// get all food ordering group
router.get('/', groupController.getGroups)

// get restaurant and menu info of a group
router.get('/:group_id', groupController.getGroup)

// update info of a food ordering group - admin only
router.put('/:group_id', authenticatorAdmin, groupController.putGroup)

// update order status
router.put('/:group_id/status',authenticatorAdmin, groupController.putOrderStatus)

// delete a food ordering group - admin only
router.delete('/:group_id', authenticatorAdmin, groupController.deleteGroup)

// get order details of a food ordering group - admin only
router.get('/orders/:group_id', authenticatorAdmin, (req, res) => {
  res.send('order details: total qty, total price, restaurant-tel... ')
})

module.exports = router