const passport = require('passport')
const fs = require('fs')

const css = {
  style: fs.readFileSync('public/styles/index.css', 'utf8'),
}

function viewLogin(req, res) {
  res.render('pages/login', {
    css: css,
    message: req.flash('message'),
  })
}

function login(req, res) {
  const loginStrategy = passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })

  return loginStrategy(req, res)
}

function viewRegister(req, res) {
  res.render('pages/register', {
    css: css,
    message: req.flash('message'),
  })
}

function register(req, res) {
  const signupStrategy = passport.authenticate('register', {
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
  viewRegister: viewRegister,
  register: register,
  logout: logout,
}
