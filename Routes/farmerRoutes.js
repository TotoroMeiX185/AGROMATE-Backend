// routes/farmerRoutes.js
import express from 'express';
import {registerFarmer} from '../Controllers/farmerC.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
const router = express.Router();
//import Farmerfinance from '../Models/Farmerfinance.js';



// POST /api/farmers/register
router.post('/register', registerFarmer);

export default router;
