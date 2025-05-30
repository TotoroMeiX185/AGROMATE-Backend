// routes/farmerRoutes.js
import express from 'express';
import {registerFarmer} from '../Controllers/farmerC.js';
import { getFarmerProfile } from '../Controllers/financeC.js';
import { protect } from '../middleware/authMiddleware.js';
import Farmer from '../Models/Afarmer.js';
const router = express.Router();


// POST /api/farmers/register
router.post('/register', registerFarmer);
router.get('/profile', protect, getFarmerProfile);

router.get('/crops', protect , async (req, res) => {
  try {
    // Adjust this according to your DB schema
    const farmer = await Farmer.findById(req.user.id).populate('crops');
    if (!farmer) return res.status(404).json({ message: 'Farmer not found' });
    res.json(farmer.crops); // or whatever your crops array is
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
export default router;
