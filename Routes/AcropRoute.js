import express from 'express';
import Crop from '../Models/Crop.js';
import Farmer from '../Models/Farmer.js';

const router = express.Router();

// GET /api/crops/:nic - Get crops by NIC
router.get('/:nic', async (req, res) => {
  try {
    const farmer = await Farmer.findOne({ nic: req.params.nic });
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }

    const crops = await Crop.find({ farmerId: farmer._id });
    res.json(crops);
  } catch (error) {
    console.error('Error fetching crop data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
