const passport = require('passport')
const User = require('../modules/user/user.model')
const { ExtractJwt, Strategy } = require('passport-jwt')
const { secrets } = require('../config')

const cookieExtractor = (req) => {
  let token = null
  if (req && req.cookies.jwt) {
    token = req.cookies.jwt
  }

  return token
}

const options = {
  secretOrKey: secrets.auth.jwt_secret,
  algorithms: ['RS256'],
  passReqToCallback: true,
}

options.jwtFromRequest = ExtractJwt.fromExtractors([
  ExtractJwt.fromAuthHeaderAsBearerToken(),
  (req) => cookieExtractor(req),
])

passport.use(
  new Strategy(options, (req, jwtPayload, done) => {
    User.findOne({ _id: jwtPayload.id })
      .then((user) => {
        if (user) {
          delete user._doc.password
          done(null, user)
        } else {
          done(null, false)
        }
      })
      .catch((err) => {
        if (err) {
          return done(err, false)
        }
      })
  })
)

module.exports = passport
