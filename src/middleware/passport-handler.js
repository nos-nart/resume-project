const passport = require('passport')
const passportLocal = require('passport-local')
const passportJwt = require('passport-jwt')
const User = require('../modules/user/user.model')
const { config } = require('../config')

const JWT_SECRET = config.auth.jwt_secret

const LocalStrategy = passportLocal.Strategy
const JwtStrategy = passportJwt.Strategy

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username: username }).exec()
        user.comparePassword(password, (err, isMatch) => {
          if (err) return done(err)
          return isMatch
            ? done(null, user)
            : done('Incorrect username/password!')
        })
      } catch (err) {
        done(err)
      }
    }
  )
)

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: (req) => req.cookies.jwt,
      secretOrKey: JWT_SECRET,
    },
    (jwtPayload, done) => {
      if (Date.now() > jwtPayload.expires) {
        return done('jwt expired!')
      }
      return done(null, jwtPayload)
    }
  )
)
