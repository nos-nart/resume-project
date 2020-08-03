const cloudinary = require('cloudinary').v2
const secrets = require('./secrets')

cloudinary.config({
  cloud_name: secrets.cloudinary.cloud_name,
  api_key: secrets.cloudinary.api_key,
  api_secret: secrets.cloudinary.api_secret,
})

const uploadImage = async (file) => {
  return await cloudinary.uploader.upload(file, { resource_type: 'image' })
}

const getResized = (imageName) => {
  return cloudinary.url(imageName, {
    width: 500,
    height: 500,
    crop: 'fill',
    quality: 'auto',
  })
}

module.exports = {
  uploadImage,
  getResized,
}
