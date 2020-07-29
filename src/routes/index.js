const express = require('express')
const fs = require('fs')

const router = express.Router()

const css = {
  style: fs.readFileSync('public/styles/index.css', 'utf8'),
}

router.get('/', (req, res) => {
  res.render('pages/index', { userName: 'nos' })
})

router.get('/sign-in', (req, res) => {
  res.render('pages/sign-in', {
    css: css,
  })
})

router.get('/sign-up', (req, res) => {
  res.render('pages/sign-up', {
    css: css,
  })
})

router.get('/user/detail/:id', (req, res) => {
  res.render('pages/account-detail', { userName: 'nos nart' })
})

router.get('/cv/create', (req, res) => {
  res.render('pages/create-cv', {
    userName: 'nosnart',
    css: css,
  })
})

router.get('*', (req, res) => {
  res.render('pages/404')
})

module.exports = router
