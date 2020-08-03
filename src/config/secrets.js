require('dotenv').config()

const secrets = {
  server: {
    port: process.env.PORT || '6789',
  },
  db: {
    uri: process.env.MONGO_URI || '',
  },
  auth: {
    jwt_secret: process.env.JWT_SECRET,
    jwt_expires_ms: process.env.JWT_EXPIRES_MS || '24h',
  },
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
}

module.exports = secrets
