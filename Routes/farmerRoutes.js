// routes/farmerRoutes.js
const express = require('express');
const router = express.Router();
const { registerFarmer } = require('../Controllers/farmerC');

// POST /api/farmers/register
router.post('/register', registerFarmer);

module.exports = router;
