const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const configAuth = require('./auth.config')
const User = require('../modules/user/user.model')
const { logger } = require('./index')

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })

  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
      },
      function (req, username, password, done) {
        logger.info(username)
        process.nextTick(function () {
          User.findOne({ username: username }, function (err, user) {
            if (err) return done(err)
            if (user) {
              return done(
                null,
                false,
                req.flash('signupMessage', 'That username is already taken!')
              )
            } else {
              const newUser = new User()
              newUser.username = username
              newUser.password = password

              newUser.save(function (err) {
                if (err) return
                return done(null, newUser)
              })
            }
          })
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
      function (req, username, password, done) {
        User.findOne({ username: username }, function (err, user) {
          if (err) return done(err)
          if (!user) {
            return done(
              null,
              false,
              req.flash('loginMessage', 'No user found.')
            )
          }
          if (!user.comparePassword(password)) {
            return done(
              null,
              false,
              req.flash('loginMessage', 'Oops! Wrong password.')
            )
          }
          logger.info('Login succeed!')
          return done(null, user)
        })
      }
    )
  )

  // passport.use(
  //   new GoogleStrategy(
  //     {
  //       clientID: configAuth.googleAuth.clientID,
  //       clientSecret: configAuth.googleAuth.clientSecret,
  //       callbackURL: configAuth.googleAuth.callbackURL,
  //     },
  //     function (token, refreshToken, profile, done) {
  //       process.nextTick(function () {
  //         User.findOne({ 'google.id': profile.id }, function (err, user) {
  //           if (err) return done(err)
  //           if (user) {
  //             return done(null, user)
  //           } else {
  //             var newUser = new User()
  //             newUser.googleId = profile.id
  //             newUser.google.token = token
  //             // newUser.google.name = profile.displayName
  //             newUser.email = profile.emails[0].value
  //             newUser.save(function (err) {
  //               if (err) throw err
  //               return done(null, newUser)
  //             })
  //           }
  //         })
  //       })
  //     }
  //   )
  // )
}
