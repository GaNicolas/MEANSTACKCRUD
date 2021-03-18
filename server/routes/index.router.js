const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlListUser = require('../controllers/listusercontroller')

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/userProfile', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);

module.exports = router;