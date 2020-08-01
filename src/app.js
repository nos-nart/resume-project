/*eslint-env es6*/
require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const passport = require('passport')
const session = require('express-session')
const { logger } = require('./config')
const expressPino = require('express-pino-logger')
const { errorHandler } = require('./middleware')
require('./passport/init')(passport)

const routes = require('./routes')

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
app.use(
  session({
    secret: process.env.SECRET_SESSION_KEY,
    resave: true,
    saveUninitialized: true,
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use(function (req, res, next) {
  global.currentUser = req.user
  res.locals.currentUser = req.user
  next()
})

app.use(routes)

app.use(expressLogger)

app.use(errorHandler)

module.exports = app
