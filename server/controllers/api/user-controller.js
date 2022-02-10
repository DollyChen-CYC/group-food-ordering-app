const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../../models')

const userController = {
  getUsers: (req, res) => {
    res.send('user list')
  },
  login: (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) return res.send({ status: 'error', message: 'All fields are required!' })

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