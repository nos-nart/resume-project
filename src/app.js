/*eslint-env es6*/
require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const { logger } = require('./config')
const expressPino = require('express-pino-logger')
const { errorHandler } = require('./middleware')

const routes = require('./routes')
const userRoute = require('./modules/user/user.route')

const app = express()

const expressLogger = expressPino({
  logger,
})

// set the view engine to ejs
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))

app.use(express.json())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)
app.use('/', routes)
app.use('/api', userRoute)
app.use(expressLogger)

app.use(errorHandler)

module.exports = app
