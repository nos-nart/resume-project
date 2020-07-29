const passport = require('passport')
const User = require('../modules/user/user.model')
const { Strategy } = require('passport-local')

const authFields = {
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true,
}

passport.use(
  'login',
  new Strategy(authFields, async (req, username, password, cb) => {
    try {
      const user = await User.findOne({ username })

      if (!user || !user.password) {
        return cb(null, false, { message: 'Incorrect email or password.' })
      }
      const checkPassword = await user.comparePassword(password)
      if (!checkPassword) {
        return cb(null, false, { message: 'Incorrect email or password.' })
      }
      return cb(null, user, { message: 'Logged In Successfully' })
    } catch (err) {
      return cb(null, false, { statusCode: 400, message: err.message })
    }
  })
)

passport.use(
  'register',
  new Strategy(authFields, async (req, username, password, cb) => {
    try {
      const checkUsername = await User.checkExistingField('username', username)

      if (checkUsername) {
        return cb(null, false, {
          statusCode: 409,
          message: 'Username already registered, log in instead',
        })
      }

      let newUser = new User()
      newUser = {
        username: req.body.username,
        password: req.body.password,
      }
      await newUser.save()
      return cb(null, newUser)
    } catch (err) {
      return cb(null, false, { statusCode: 400, message: err.message })
    }
  })
)
