// routes/farmerRoutes.js
import express from 'express';
import {registerFarmer} from '../Controllers/farmerC.js';

const router = express.Router();
// POST /api/farmers/register
router.post('/register', registerFarmer);

export default router;
