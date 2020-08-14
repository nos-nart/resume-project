const express = require('express')
const router = express.Router()
const passport = require('passport')
const UserController = require('../modules/user/user.controller')
const CVController = require('../modules/cv/cv.controller')
const { multerConfig } = require('../config')

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/login')
}

router.route('/').get((req, res) => {
  res.render('pages/index', {
    title: 'coca',
    userName: 'nos',
    route: 'home',
    message: req.flash('message'),
  })
})

router
  .route('/login')
  .get(UserController.getLogin)
  .post(
    passport.authenticate('local-login', {
      successRedirect: '/cv',
      failureRedirect: '/login',
      failureFlash: true,
    })
  )

router.get('/signup', UserController.getSignup)
router.post(
  '/signup',
  passport.authenticate('local-signup', {
    successRedirect: '/login',
    failureRedirect: '/signup',
    failureFlash: true,
  })
)

router.route('/cv').get(isLoggedIn, (req, res) => {
  res.render('pages/cv', {
    title: 'CV',
    route: 'cv',
  })
})

router
  .route('/cv/create')
  .get(CVController.viewCreate)
  .post(multerConfig, CVController.createCV)

router.get('*', (req, res) => {
  res.render('pages/404')
})

module.exports = router
