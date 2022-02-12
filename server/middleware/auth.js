const passport = require('../config/passport')

module.exports = {
  authenticator: passport.authenticate('jwt', { session: false }),
}