const express = require('express')
const { generateTestPrintPDF, generateSKTMPDF } = require('../controllers/letter/sktmController');

const router = express.Router()

router.get('/', generateTestPrintPDF)
router.get('/generate-test-print-pdf', generateSKTMPDF)

module.exports = router