const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User, User_order, Group_order, Restaurant, Dish } = require('../../models')

const userController = {
  deleteUserOrder: (req, res) => {
    const orderId = +req.params.order_id
    User_order.findByPk(orderId)
      .then(order => {
        if (!order) return res.json({ status: "error", message: "Order does not exist." })
        // avoid deleting order not does not belong to the current user
        if (order.user_id !== +req.user.id && !req.user.is_admin) return res.status(403).json({ status: 'error', message: 'permission denied' })
        return order.destroy()
      })
      .then(order => {
        return res.json({ status: "success", message: `Order (ID: ${order.id}) is successfully deleted.` })
      })
      .catch(err => {
        console.log('-- Failed to delete order --', err)
        res.status(500).json({ status: "error", message: "Failed to delete order" })
      })
  },
  getUser: (req, res) => {
    const userId = +req.params.user_id
    User.findByPk(userId)
      .then(user => {
        if (!user) return res.status(404).json({ status: 'error', message: `User (ID: ${userId}) does not exist.` })

        const { id, email, name, password, cell_phone: cellPhone } = user
        return res.json({
          status: 'success',
          message: 'ok',
          data: {
            user: {
              id,
              email,
              name,
              cellPhone
            }
          }
        })
      }).catch(err => {
        console.log('-- Failed to get user info --', err)
        return res.status(500).json({ status: 'error', message: 'Failed to get user info' })
      })
  },
  getUserOrder: (req, res) => {
    const orderId = +req.params.order_id
    User_order.findByPk(orderId, {
      include: [
        {
          model: Group_order,
          attributes: ['id', 'restaurant_id', 'order_delivery_time', 'order_status'],
          include: [{ model: Restaurant, attributes: ['id', 'name'] }]
        },
        {
          model: Dish,
          attributes: ['name', 'price']
        }
      ]
    })
      .then(order => {
        if (!order) return res.json({ status: "error", message: "Order does not exist." })
        return res.json({ status: "success", message: 'ok', data: { order } })
      })
      .catch(err => {
        console.log('-- Failed to get order info --', err)
        return res.status(500).json({ status: "error", message: "Failed to get order info." })
      })
  },
  getUserOrders: (req, res) => {
    const userId = +req.params.user_id
    User_order.findAll({
      raw: true,
      nest: true,
      where: { user_id: userId },
      attributes: ['id', 'user_id', 'dish_id', 'group_id'],
      include: [
        {
          model: Group_order,
          attributes: ['id', 'restaurant_id', 'order_delivery_time', 'take_meal_at', 'order_status'],
          include: [{ model: Restaurant, attributes: ['id', 'name'] }]
        },
        {
          model: Dish,
          attributes: ['name', 'price']
        }
      ],
    })
      .then(orders => {
        return res.json({ status: "success", message: "ok", data: { orders } })
      })
      .catch(err => {
        console.log('-- Failed to get user orders --', err)
        return res.status(500).json({ status: "error", message: "Failed to get user orders" })
      })
  },
  login: (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.json({ status: 'error', message: 'All fields are required!' })

    User.findOne({ where: { email } })
      .then(user => {
        if (!user) return res.json({ status: 'error', message: 'User does not exist.' })

        const isPasswordPassed = bcrypt.compareSync(password, user.password)
        if (!isPasswordPassed) return res.json({ status: 'error', message: 'The password is incorrect.' })

        // sign Token
        const { id, name, email, cell_phone: cellPhone, is_admin: isAdmin } = user
        const payload = { id }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' })

        return res.json({
          status: 'success',
          message: 'Login successfully',
          data: {
            token,
            user: {
              id,
              name,
              email,
              cellPhone,
              isAdmin,
              isAuthenticated: true
            },
          }
        })
      })
      .catch(err => {
        console.log('-- Login Failed --', err)
        return res.status(500).json({ status: 'error', message: 'Login Failed' })
      })
  },
  postUserOrder: (req, res) => {
    const user_id = +req.params.user_id
    const { dishId: dish_id, groupId: group_id } = req.body
    if (!dish_id || !group_id) {
      return res.json({ status: 'error', message: 'Some required fields are empty!' })
    }
    User_order.create({ user_id, dish_id, group_id })
      .then(order => {
        return res.json({ status: "success", message: "Successfully placed order.", data: { order } })
      })
      .catch(err => {
        console.log('-- Failed to create order --', err)
        return res.status(500).json({ status: "error", message: "Failed to create order" })
      })
  },
  putUser: (req, res) => {
    const userId = +req.params.user_id
    const { name, cellPhone } = req.body
    if (!name || !cellPhone) {
      return res.json({ status: 'error', message: 'Some required fields are empty!' })
    }

    User.update({ name, cell_phone: cellPhone }, { where: { id: userId } })
      .then(user => res.json({ status: 'success', message: 'Profile updated!' }))
      .catch(err => {
        console.log('-- Failed to update user info --', err)
        return res.status(500).json({ status: 'error', message: 'Failed to update user info' })
      })
  },
  signUp: (req, res) => {
    const { email, name, password, confirmPassword, cellPhone } = req.body

    if (!(email && name && password && confirmPassword && cellPhone)) {
      return res.json({ status: 'error', message: 'Some required fields are empty!' })
    }

    if (password !== confirmPassword) {
      return res.json({ status: 'error', message: 'The two password fields do not match!' })
    }

    // make sure user email is unique
    User.findOne({ where: { email } })
      .then(user => {
        if (user) return res.json({ status: 'error', message: 'This email is already registered!' })

        return User.create({
          email,
          name,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
          cell_phone: cellPhone
        })
      })
      .then(user => {
        return res.json({ status: 'success', message: 'Registration success!' })
      })
      .catch(err => {
        console.log('-- Registration Failed --', err)
        return res.status(500).json({ status: 'error', message: 'Registration Failed' })
      })
  }
}

module.exports = userController