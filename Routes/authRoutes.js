const express = require('express');
const router = express.Router();
const { loginUser } = require('../Controllers/authcontroller');
//const { protect } = require('../middleware/authMiddleware'); // Assuming you have a middleware for authentication
const { restrictTo } = require('../middleware/roleMiddleware'); // Assuming you have a middleware for role restriction

// @route   POST /api/auth/login
router.post('/login', loginUser);
//router.post('/register', registerUser); // Assuming you have a registerUser function in your controller
router.get('/Adashboard', restrictTo('admin'), (req, res) => {
  res.send('Welcome to the admin dashboard!');
});

module.exports = router;
