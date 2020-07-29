/*eslint-env es6*/
require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const { logger } = require('./config')
const expressPino = require('express-pino-logger')
const { errorHandler } = require('./middleware')

const routes = require('./routes')
const userRoute = require('./modules/user/user.route')
const cvRoute = require('./modules/cv/cv.route')

const app = express()

const expressLogger = expressPino({
  logger,
})

// set the view engine to ejs
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))

app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

passport.initialize()

app.use('/', routes)
app.use('/account', userRoute)
app.use('/cv', cvRoute)

app.use(expressLogger)

app.use(errorHandler)

module.exports = app
