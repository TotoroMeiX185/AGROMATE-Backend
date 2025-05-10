// routes/farmerRoutes.js
import { Router } from 'express';
const router = Router();
import farmerController from '../Controllers/farmerC';
const { registerFarmer } = farmerController;

// POST /api/farmers/register
router.post('/register', registerFarmer);

export default router;
