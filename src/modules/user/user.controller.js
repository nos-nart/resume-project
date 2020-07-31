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

function viewRegister(req, res) {
  res.render('pages/register', {
    css: css,
    message: req.flash('message'),
  })
}

function register(req, res) {}

module.exports = {
  viewLogin,
  viewRegister,
}

// module.exports = {
//   viewLogin: (req, res) => {
//     res.render('pages/login', {
//       css: css,
//     })
//   },
//   login: async (req, res, next) => {},
//   viewRegister: (req, res) => {
//     res.render('pages/register', {
//       css: css,
//     })
//   },
//   register: async (req, res, next) => {},
//   viewUser: (req, res) => {
//     res.render('pages/account-detail', {
//       userName: 'nos nart',
//       css: css,
//       route: 'user',
//     })
//   },
// }
