const logger = require('../config')

/* eslint-disable */
const errorHandler = (err, req, res, next) => {
  logger.error(err)
}

module.exports = errorHandler