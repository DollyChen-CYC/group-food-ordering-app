const express = require('express')
const router = express.Router()
const groupController = require('../../controllers/api/group-controller')
const permissionChecker = require('../../middleware/accessPermission')

// create a new group - admin only
router.post('/', permissionChecker.admin, groupController.postGroup)

// get all food ordering group
router.get('/', groupController.getGroups)

// get restaurant and menu info of a group
router.get('/:group_id', groupController.getGroup)

// update info of a food ordering group - admin only
router.put('/:group_id', permissionChecker.admin, groupController.putGroup)

// update order status
router.put('/:group_id/status',permissionChecker.admin, groupController.putOrderStatus)

// delete a food ordering group - admin only
router.delete('/:group_id', permissionChecker.admin, groupController.deleteGroup)

// get order details of a food ordering group - admin only
router.get('/orders/:group_id', permissionChecker.admin, (req, res) => {
  res.send('order details: total qty, total price, restaurant-tel... ')
})

module.exports = router