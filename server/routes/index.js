const express = require('express')
const router = express.Router()
const group = require('./api-modules/group')
const restaurant = require('./api-modules/restaurant')
const user = require('./api-modules/user')
const { authenticator } = require('../middleware/auth')

router.use('/api/groups',authenticator, group)
router.use('/api/restaurants', authenticator, restaurant)
router.use('/api/users', user)
router.get('/', (req, res) => res.send('APIs for Group Food Ordering App'))
router.get('*', (req, res) => res.send('Page Not Found'))

module.exports = router