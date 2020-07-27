const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.render('pages/index', { userName: 'nos' })
})

router.get('/sign-in', (req, res) => {
  res.render('pages/sign-in')
})

router.get('/sign-up', (req, res) => {
  res.render('pages/sign-up')
})

router.get('/user/detail/:id', (req, res) => {
  res.render('pages/account-detail', { userName: 'nos nart' })
})

router.get('*', (req, res) => {
  res.render('pages/404')
})

module.exports = router
