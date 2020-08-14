const fs = require('fs')

const css = {
  style: fs.readFileSync('public/styles/index.css', 'utf8'),
}

function getLogin(req, res) {
  res.render('pages/login', {
    css: css,
    title: 'Login',
    message: req.flash('loginMessage'),
  })
}

function getSignup(req, res) {
  res.render('pages/signup', {
    css: css,
    title: 'Signup',
    message: req.flash('signupMessage'),
  })
}

function logout(req, res) {
  req.logout()
  res.redirect('/')
}

module.exports = {
  getLogin,
  getSignup,
  logout,
}
