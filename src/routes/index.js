const express = require('express')
const router = express.Router()
const UserController = require('../modules/user/user.controller')
const CVController = require('../modules/cv/cv.controller')

function authenticateUser(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/')
}

router.route('/').get((req, res) => {
  res.render('pages/index', {
    userName: 'nos',
    route: 'home',
    message: req.flash('message'),
  })
})

router.route('/login').get(UserController.viewLogin)

router
  .route('/register')
  .get(UserController.viewRegister)
  .post(UserController.register)

// .post('/register', UserController.register)
// // view user detail route
// .get('/user/detail/:id', UserController.viewUser)
// // create cv route
router
  .route('/cv/create')
  .get(CVController.viewCreate)
  .post(CVController.createCV)

router.get('*', (req, res) => {
  res.render('pages/404')
})

module.exports = router
