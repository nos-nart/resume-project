const User = require('./user.model')
const jwt = require('jsonwebtoken')

module.exports = {
  signUp: async (req, res) => {
    try {
      const { username, password } = req.body
      await User.create({ username, password })

      // const token = jwt.sign...

      res.status(200).json({ message: 'Sign up successfully!' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },
  signIn: async (req, res) => {
    try {
      const { username, password } = req.body
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },
}
