const express = require('express')
const fs = require('fs')
const dayjs = require('dayjs')

const router = express.Router()

const css = {
  style: fs.readFileSync('public/styles/index.css', 'utf8'),
}

const ROUTES = {
  HOME: 'home',
  CV: 'cv',
  ACCOUNT: 'account',
}

router.get('/', (req, res) => {
  res.render('pages/index', {
    userName: 'nos',
    route: ROUTES.HOME,
  })
})

router.get('/login', (req, res) => {
  res.render('pages/login', {
    css: css,
  })
})

router.get('/register', (req, res) => {
  res.render('pages/register', {
    css: css,
  })
})

router.get('/user/detail/:id', (req, res) => {
  res.render('pages/account-detail', {
    userName: 'nos nart',
    css: css,
    route: ROUTES.ACCOUNT,
  })
})

router.get('/cv/create', (req, res) => {
  res.render('pages/create-cv', {
    userName: 'nosnart',
    css: css,
    now: dayjs().format('MMM D, YYYY h:mm A'),
    route: ROUTES.CV,
  })
})

router.get('*', (req, res) => {
  res.render('pages/404')
})

module.exports = router
