const express = require('express')
const { getResidents, createResident, updateResident, deleteResident } = require('../controllers/resident/resident_controller')
const upload = require('../middleware/uploadResidentPhoto')

const router = express.Router()

router.get('/', getResidents)
router.post('/', upload.single('formal_foto'), createResident)
const fs = require('fs')
const path = require('path')
router.put('/:id', upload.single('formal_foto'), updateResident)
router.delete('/:id', deleteResident)

module.exports = router
