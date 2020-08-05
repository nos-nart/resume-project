const passport = require('passport')
const fs = require('fs')

const css = {
  style: fs.readFileSync('public/styles/index.css', 'utf8'),
}

function viewLogin(req, res) {
  res.render('pages/login', {
    css: css,
    message: req.flash('loginMessage'),
  })
}

function login(req, res) {
  const loginStrategy = passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })

  return loginStrategy(req, res)
}

function getRegister(req, res) {
  res.render('pages/register', {
    css: css,
    message: req.flash('registerMessage'),
  })
}

function postRegister(req, res) {
  const signupStrategy = passport.authenticate('local-register', {
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true,
  })

  return signupStrategy(req, res)
}

function logout(req, res) {
  req.logout()
  res.redirect('/')
}

module.exports = {
  viewLogin: viewLogin,
  login: login,
  getRegister,
  postRegister,
  logout: logout,
}
