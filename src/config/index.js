const secrets = require('./secrets')
const connectDB = require('./db')
const logger = require('./logger')
const { cloudinary } = require('cloudinary')
const { upload } = require('./multer')

module.exports = {
  secrets,
  connectDB,
  logger,
  cloudinary,
  upload,
}
