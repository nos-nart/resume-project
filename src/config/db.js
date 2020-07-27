const mongoose = require('mongoose')
const config = require('./config')

const { uri } = config.db

const connectDB = function () {
  const db = mongoose.connection

  db.on('connected', () => {
    console.log('Mongo connection established')
  })

  db.on('close', () => {
    console.log('Mongo connection closed')
  })

  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // autoReconnect: true,
    keepAlive: true,
  })
}

module.exports = connectDB
