const cloudinary = require('cloudinary').v2
const secrets = require('./secrets')

cloudinary.config({
  cloud_name: secrets.cloudinary.name,
  api_key: secrets.cloudinary.api_key,
  api_secret: secrets.cloudinary.api_secret,
})

module.exports = { cloudinary }
