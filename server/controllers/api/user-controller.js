const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../../models')

const userController = {
  getUser: (req, res) => {
    const userId = +req.params.user_id
    // only admin and user himself/herself can access the user profile
    if (userId !== +req.user.id && !req.user.is_admin) {
      return res.status(403).json({ status: 'error', message: 'permission denied' })
    }

    User.findByPk(userId)
      .then(user => {
        if (!user) return res.status(404).json({ status: 'error', message: 'User not exist.' })

        const { id, email, name, password, cell_phone: cellPhone } = user
        return res.json({
          status: 'success',
          message: 'ok',
          user: {
            id,
            email,
            name,
            cellPhone
          }
        })
      }).catch(err => console.log(err))
  },
  login: (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.json({ status: 'error', message: 'All fields are required!' })

    User.findOne({ where: { email } })
      .then(user => {
        if (!user) return res.status(401).json({ status: 'error', message: 'User not found.' })

        const isPasswordPassed = bcrypt.compareSync(password, user.password)
        if (!isPasswordPassed) return res.status(401).json({ status: 'error', message: 'The password is incorrect.' })

        // sign Token
        const { id, name, email, cell_phone: cellPhone, is_admin: isAdmin } = user
        const payload = { id }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' })

        return res.json({
          status: 'success',
          message: 'OK',
          token,
          user: {
            id,
            name,
            email,
            cellPhone,
            isAdmin
          },
          isAuthenticated: true
        })
      })
  },
  putUser: (req, res) => {
    const userId = +req.params.user_id
    // only admin and user himself/herself can access the user profile
    if (userId !== +req.user.id && !req.user.is_admin) {
      return res.status(403).json({ status: 'error', message: 'permission denied' })
    }

    const { name, cellPhone } = req.body
    if (!name || !cellPhone) {
      return res.json({ status: 'error', message: 'Some required fields are empty!' })
    }

    User.update({ name, cell_phone: cellPhone }, { where: { id: userId } })
      .then(user => res.json({ status: 'success', message: 'Profile updated!' }))
      .catch(err => console.log(err))
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
        console.log('--Registration success!--')
        return res.json({ status: 'success', message: 'Registration success!' })
      })
      .catch(err => console.log(err))
  }
}

module.exports = userController