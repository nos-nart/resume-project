const User = require('./user.model')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const { config } = require('../../config')

module.exports = {
  signUp: async (req, res) => {
    try {
      const { username, password } = req.body
      await User.create({ username, password })

      res.status(200).json({ message: 'Sign up successfully!' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },
  signIn: async (req, res) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const { username, password } = req.body
      passport.authenticate('local', { session: false }, (err, user) => {
        if (err || !user) {
          res.status(400).json({ err })
        }

        const payload = {
          username: user.username,
          expires: Date.now() + parseInt(config.auth.jwt_expires_ms),
        }

        req.login(payload, { session: false }, (err) => {
          if (err) res.status(400).json({ err })

          /** generate a signed json web token and return it in the response */
          const token = jwt.sign(
            JSON.stringify(payload),
            config.auth.jwt_secret
          )
          /** assign our jwt to the cookie */
          res.cookie('jwt', token, { httpOnly: true, secure: true })
          res.status(200).send({ username })
        })
      })(req, res)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },
}
