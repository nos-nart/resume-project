const app = require('./app')
// eslint-disable-next-line no-unused-vars
const { secrets, connectDB, logger } = require('./config')

const port = secrets.server.port

connectDB()
  .then(async () => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  })
  .catch((err) => {
    console.log('Mongo connection ERROR: ' + err)
  })
