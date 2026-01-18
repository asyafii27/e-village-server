const express = require('express')
const { getResidents, createResident } = require('../controllers/resident/resident_controller')

const router = express.Router()

router.get('/', getResidents)
router.post('/', createResident)

module.exports = router
