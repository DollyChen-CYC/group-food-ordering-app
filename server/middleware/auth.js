const passport = require('../config/passport')

module.exports = {
  authenticator: passport.authenticate('jwt', { session: false }),
  authenticatorAdmin: (req, res, next) => {
    if (req.user && req.user.is_admin) return next()
    return res.status(403).json({ status: 'error', message: 'permission denied' })
  }
}