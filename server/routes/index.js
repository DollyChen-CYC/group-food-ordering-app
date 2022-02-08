const express = require('express')
const router = express.Router()
const order = require('./api-modules/order')
const restaurant = require('./api-modules/restaurant')
const user = require('./api-modules/user')

router.use('/api/order', order)
router.use('/api/restaurant', restaurant)
router.use('/api/user', user)
router.get('/', (req, res) => res.send('APIs for Group Food Ordering App'))
router.get('*', (req, res) => res.send('Page Not Found'))

module.exports = router