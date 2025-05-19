import express from 'express';
import Crop from '../Models/Crop.js';
import {protect} from '../middleware/authMiddleware.js';

const router = express.Router();

// Add crop info (POST /api/crops)
router.post('/', protect, async (req, res) => {
  try {
    const cropData = new Crop({
      ...req.body,
      farmerId: req.user.id, // associate with logged-in farmer
    });

    await cropData.save();
    res.status(201).json({ message: 'Crop added successfully', crop: cropData });
  } catch (error) {
    console.error('Error saving crop:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
