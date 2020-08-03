const multer = require('multer')
const path = require('path')

// eslint-disable-next-line no-unused-vars
const storage = multer.memoryStorage()
const fileStorage = multer.diskStorage({
  destination: 'public/uploads',
  filename: (req, file, cb) => {
    console.log('file', file)
    cb(null, new Date().getTime() + path.extname(file.originalname))
  },
})

module.exports = multer({ storage: fileStorage }).single('avatar')
