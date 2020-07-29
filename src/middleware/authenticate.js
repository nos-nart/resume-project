const passportJWT = require('../services/config')

module.exports = {
  authenticate: (req, res, next) => {
    passportJWT.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) {
        return next(err)
      }

      if (!user) {
        res.status(400).json({ message: 'User not found!' })
      }
      req.user = user
      return next()
    })(req, res, next)
  },
}
