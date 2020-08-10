const express = require('express')
const router = express.Router()
const UserController = require('../modules/user/user.controller')
const CVController = require('../modules/cv/cv.controller')
const { multerConfig } = require('../config')

function authenticateUser(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/')
}

module.exports = function (passport) {
  router.route('/').get((req, res) => {
    res.render('pages/index', {
      userName: 'nos',
      route: 'home',
      message: req.flash('message'),
    })
  })

  router.route('/login').get(UserController.getLogin)

  router
    .route('/register')
    .get(UserController.getRegister)
    .post(
      passport.authenticate('local-register', {
        successRedirect: '/',
        failureRedirect: '/register',
        failureFlash: true,
      })
    )

  // .post('/register', UserController.register)
  // // view user detail route
  // .get('/user/detail/:id', UserController.viewUser)
  // // create cv route
  router
    .route('/cv/create')
    .get(CVController.viewCreate)
    .post(multerConfig, CVController.createCV)

  router.get('*', (req, res) => {
    res.render('pages/404')
  })

  return router
}
