const express = require('express')
const { getResidents, createResident, updateResident } = require('../controllers/resident/resident_controller')

const router = express.Router()

router.get('/', getResidents)
router.post('/', createResident)
router.put('/:id', updateResident)

module.exports = router
