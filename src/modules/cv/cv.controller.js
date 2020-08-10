const CV = require('./cv.model')
const dayjs = require('dayjs')
const fs = require('fs')
const { uploadImage, logger } = require('../../config')
const httpStatus = require('http-status')

const css = {
  style: fs.readFileSync('public/styles/index.css', 'utf8'),
}

async function viewCreate(req, res) {
  res.render('pages/create-cv', {
    userName: 'nosnart',
    css: css,
    now: dayjs().format('MMM D, YYYY h:mm A'),
    route: 'cv',
  })
}

async function createCV(req, res, next) {
  // upload the image to cloudinary by using multer
  // then get back an url and save It to mongo
  try {
    logger.info(req)
    // const imageStream = req
    // console.log('createCV -> imageStream', imageStream)
    // const imageName
    const avaUrl = await uploadImage(req.file.path)
    await fs.unlinkSync(req.file.path)
  } catch (err) {
    logger.error(err)
    res.status(httpStatus[500]).json({ message: err.message })
  }
}

module.exports = {
  viewCreate: viewCreate,
  createCV: createCV,
}
