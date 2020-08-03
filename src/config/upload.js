const multer = require('multer')
const path = require('path')

// https://github.com/schmidgallm/file-uploader/blob/master/routes/api/image.js

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
})

const upload = multer({ storage })

module.export = upload
