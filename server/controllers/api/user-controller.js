const bcrypt = require('bcryptjs')
const { User } = require('../../models')

const userController = {
  getUsers: (req, res) => {
    res.send('user list')
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
        return res.json({ status: 'success', message: 'Registration success!'})
      })
      .catch(err => console.log(err))
  }
}

module.exports = userController