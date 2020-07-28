const express = require('express')
const CVController = require('./cv.controller')
const router = express.Router()

router.get('/cv', CVController.getAll)
router.post('/cv/create', CVController.create)
router.get('/cv/detail/:id', CVController.findById, CVController.detail)

module.exports = router
