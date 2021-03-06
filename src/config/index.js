const secrets = require('./secrets')
const connectDB = require('./db')
const logger = require('./logger')
const { uploadImage, getResized } = require('./cloudinary')
const multerConfig = require('./multer.config')

module.exports = {
  secrets,
  connectDB,
  logger,
  multerConfig,
  uploadImage,
  getResized,
}
