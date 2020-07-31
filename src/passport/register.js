const LocalStrategy = require('passport-local').Strategy
const User = require('../modules/user/user.model')
const { logger } = require('../config')

module.exports = function (passport) {
  passport.use(
    'register',
    new LocalStrategy({ passReqToCallback: true }, function (
      req,
      username,
      password,
      done
    ) {
      User.findOne({ username: username }, function (err, user) {
        if (err) {
          logger.err('Error in register!')
          return done(err)
        }
        if (user) {
          logger.info('User has already exit with username: ' + username)
          return done(null, false, req.flash('message', 'User already exist!'))
        } else {
          const newUser = new User()
          newUser.username = username
          newUser.password = password

          newUser.save(function (err) {
            if (err) {
              logger.error('Error in persiting user to DB:' + err)
              throw err
            }
            return done(null, newUser)
          })
        }
      })
    })
  )
}
