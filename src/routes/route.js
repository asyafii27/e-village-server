const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

const { login, register } = require('../controllers/auth/authController');
const { getProvinces, showProvince } = require('../controllers/region/province/ProvinceController');
const { getResidents, createResident, updateResident, deleteResident } = require('../controllers/resident/residentController');
const { getUsers } = require('../controllers/user/UserController');
const { generateSKTMPDF } = require('../controllers/letter/sktmController');
const { getCities, showCity } = require('../controllers/region/city/CityController')

// provinces
router.get('/region/provinces', getProvinces);
router.get('/region/provinces/:id', showProvince);

// city
router.get('/region/cities', authMiddleware, getCities);
router.get('/region/cities/:id', authMiddleware, showCity);


// residents
router.get('/residents', authMiddleware, getResidents);
router.post('/residents', authMiddleware, createResident);
router.put('/residents/:id', authMiddleware, updateResident);
router.delete('/residents/:id', authMiddleware, deleteResident);

// users
router.get('/users', authMiddleware, getUsers);

// auth
router.post('/login', login);
router.post('/register', register);

// test print
router.post('/test-print', generateSKTMPDF);


module.exports = router;
