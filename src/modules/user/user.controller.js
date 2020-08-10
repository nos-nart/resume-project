const fs = require('fs')

const css = {
  style: fs.readFileSync('public/styles/index.css', 'utf8'),
}

function getLogin(req, res) {
  res.render('pages/login', {
    css: css,
    message: req.flash('loginMessage'),
  })
}

function getRegister(req, res) {
  res.render('pages/register', {
    css: css,
    message: req.flash('registerMessage'),
  })
}

function logout(req, res) {
  req.logout()
  res.redirect('/')
}

module.exports = {
  getLogin,
  getRegister,
  logout,
}
