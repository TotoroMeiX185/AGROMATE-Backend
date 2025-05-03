const express = require('express');
const router = express.Router();
const { loginUser } = require('../Controllers/authcontroller');


// @route   POST /api/auth/login
router.post('/api/auth/login', loginUser);
//router.post('/register', registerUser); // Assuming you have a registerUser function in your controller

module.exports = router;
