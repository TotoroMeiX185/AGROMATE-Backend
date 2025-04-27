const express = require('express');
const router = express.Router();
const { loginUser } = require('../Controllers/authcontroller');
//const { registerUser } = require('../Controllers/authcontroller'); // Assuming you have a registerUser function in your controller
//const { errorHandler } = require('../middleware/errorMiddleware'); // Assuming you have an error handler middleware

// @route   POST /api/auth/login
router.post('/login', loginUser);
//router.post('/register', registerUser); // Assuming you have a registerUser function in your controller

module.exports = router;
