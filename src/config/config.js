const config = {
  server: {
    port: process.env.PORT || '6789',
  },
  db: {
    uri: process.env.MONGO_URI || '',
  },
  auth: {
    jwt_secret: process.env.JWT_SECRET,
  },
}

module.exports = config
