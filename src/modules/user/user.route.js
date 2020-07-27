const express = require('express')
const router = express.Router()
const UserController = require('./user.controller')

router.post('/sign-up', UserController.signUp)

module.exports = router
