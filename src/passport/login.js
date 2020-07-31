const LocalStratergy = require('passport-local').Strategy
const User = require('../modules/user/user.model')

module.exports = function (passport) {
  passport.use(
    'login',
    new LocalStratergy(
      {
        passReqToCallback: true,
      },
      function (req, username, password, done) {
        User.findOne({ username: username }, function (err, user) {
          if (err) {
            return done(err)
          }
          if (!user) {
            return done(null, false, req.flash('message', 'User not found!'))
          }
          const isValidPassword = User.comparePassword(password)
          if (!isValidPassword) {
            return done(null, false, req.flash('message', 'Invalid password!'))
          }
          return done(null, user)
        })
      }
    )
  )
}
