const LocalStrategy = require('passport-local').Strategy
const User = require('../modules/user/user.model')

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, callback) => {
    User.findById(id, (err, user) => {
      callback(err, user)
    })
  })

  passport.use()
}
