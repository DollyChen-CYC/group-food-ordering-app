
const permissionChecker = {
  admin: (req, res, next) => {
    // req.user is returned by passport-jwt 
    if (req.user && req.user.is_admin) return next()
    return res.status(403).json({ status: 'error', message: 'permission denied' })
  },
  accessUserProfile: (req, res, next) => {
    const userId = +req.params.user_id
    // req.user is returned by passport-jwt 
    const currentUser = req.user
    // only admin and user himself/herself can access the next()
    if (userId !== +currentUser.id && !currentUser.is_admin) {
      return res.status(403).json({ status: 'error', message: 'permission denied' })
    }
    return next()
  }
}

module.exports = permissionChecker