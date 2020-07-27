const express = require('express')
const CVController = require('./cv.controller')
const router = express.Router()

router.get('/', CVController.getAll)
router.get('/detail/:id', CVController.findById, CVController.detail)

module.exports = router
