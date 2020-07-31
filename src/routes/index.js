const express = require('express')
const UserController = require('../modules/user/user.controller')
const CVController = require('../modules/cv/cv.controller')

const router = express.Router()

router
  .get('/', (req, res) => {
    res.render('pages/index', {
      userName: 'nos',
      route: 'home',
      message: req.flash('message'),
    })
  })
  // login route
  .get('/login', UserController.viewLogin)
  // .post('/login', UserController.login)
  // // register route
  .get('/register', UserController.viewRegister)
// .post('/register', UserController.register)
// // view user detail route
// .get('/user/detail/:id', UserController.viewUser)
// // create cv route
// .get('/cv/create', CVController.viewCreate)
// .post('/cv/create', CVController.create)

router.get('*', (req, res) => {
  res.render('pages/404')
})

module.exports = router
