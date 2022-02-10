const passport = require('passport')
const passportJWT = require('passport-jwt')
const bcrypt = require('bcryptjs')
const { User } = require('../models')

// JWT token set 
const JwtStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt


const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

passport.use(new JwtStrategy(jwtOptions, (jwtPayload, done) => {
  User.findByPk(jwtPayload.id)
    .then(user => {
      if (!user) return done(null, false)
      return done(null, user.toJSON())
    })
    .catch(err => console.log(err))
}))

module.exports = passport