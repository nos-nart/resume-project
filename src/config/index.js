const secrets = require('./secrets')
const connectDB = require('./db')
const logger = require('./logger')

module.exports = {
  secrets,
  connectDB,
  logger,
}
