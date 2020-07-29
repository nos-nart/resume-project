const mongoose = require('mongoose')
const secrets = require('./secrets')

const { uri } = secrets.db

const connectDB = function () {
  const db = mongoose.connection

  db.on('connected', () => {
    console.log('Mongo connection established')
  })

  db.on('close', () => {
    console.log('Mongo connection closed')
  })

  return mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // autoReconnect: true,
    keepAlive: true,
  })
}

module.exports = connectDB
