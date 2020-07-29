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
}

module.exports = secrets
