const LocalStrategy = require('passport-local').Strategy
const User = require('../modules/user/user.model')
const { logger } = require('../config')

const passportInit = (passport) => {
  passport.serializeUser(function (user, callback) {
    callback(null, user.id)
  })

  passport.deserializeUser(function (id, callback) {
    User.findById(id, function (err, user) {
      callback(err, user)
    })
  })

  passport.use(
    'local-register',
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
      },
      function (req, username, password, callback) {
        // Find a user with this e-mail
        User.findOne({ username: username }, function (err, user) {
          if (err) return callback(err)

          // If there already is a user with this email
          if (user) {
            // logger.info('This username is already taken')
            return callback(
              null,
              false,
              req.flash('registerMessage', 'This username is already taken.')
            )
          } else {
            // There is no email registered with this email

            // Create a new user
            var newUser = new User()
            newUser.username = username
            newUser.password = password

            newUser.save(function (err) {
              if (err) throw err
              return callback(null, newUser)
            })
          }
        })
      }
    )
  )

  passport.use(
    'local-login',
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
      },
      function (req, username, password, callback) {
        // Search for a user with this email
        User.findOne({ username: username }, function (err, user) {
          if (err) {
            return callback(err)
          }

          // If no user is found
          if (!user) {
            return callback(
              null,
              false,
              req.flash('loginMessage', 'No user found.')
            )
          }
          // Wrong password
          if (!user.comparePassword(password)) {
            return callback(
              null,
              false,
              req.flash('loginMessage', 'Oops! Wrong password.')
            )
          }

          return callback(null, user)
        })
      }
    )
  )
}

module.exports = passportInit
