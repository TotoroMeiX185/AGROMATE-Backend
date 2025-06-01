import express from 'express';
import {getPrices,addPrice,expirePrice,deletePrice} from '../Controllers/marketC.js';
import { isAdmin, protect } from '../middleware/authMiddleware.js';
import { getAllMarketPrices } from '../Controllers/marketC.js';

const router = express.Router();

// GET /api/market-prices
router.get('/market-prices', protect, getAllMarketPrices);

// Public - Get prices
router.get('/prices', getPrices);

// Admin-only - Add new price
router.post('/prices', protect, isAdmin, addPrice);

// Admin-only - Expire a price
router.put('/prices/:id', protect, isAdmin, expirePrice);

// Admin-only - Delete a price
router.delete('/prices/:id', protect, isAdmin, deletePrice);

export default router;
