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
const routes = require('./routes')

const app = express()

// set the view engine to ejs
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))

const expressLogger = expressPino({
  logger,
})
app.use(expressLogger)
app.use(bodyParser.json())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
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
require('./config/passport.config')(passport)

app.use('/', routes)

app.use(expressLogger)

app.use(errorHandler)

module.exports = app
