const CV = require('./cv.model')
const dayjs = require('dayjs')
const fs = require('fs')
const { upload } = require('../../config')
console.log('upload', upload)

const css = {
  style: fs.readFileSync('public/styles/index.css', 'utf8'),
}

function viewCreate(req, res) {
  res.render('pages/create-cv', {
    userName: 'nosnart',
    css: css,
    now: dayjs().format('MMM D, YYYY h:mm A'),
    route: 'cv',
  })
}

function createCV(req, res, next) {
  // upload the image to cloudinary by using multer
  // then get back an url and save It to mongo
}

module.exports = {
  viewCreate: viewCreate,
  createCV: createCV,
}
