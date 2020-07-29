const app = require('./app')
// eslint-disable-next-line no-unused-vars
const { config, connectDB, logger } = require('./config')

const port = config.server.port

connectDB()
  .then(async () => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  })
  .catch((err) => {
    console.log('Mongo connection ERROR: ' + err)
  })
