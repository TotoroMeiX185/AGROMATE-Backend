import express from 'express';
import Crop from '../Models/Crop.js';
import {protect} from '../middleware/authMiddleware.js';
import Farmer from '../Models/Farmer.js';

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


// DELETE all crops of a farmer by NIC
router.delete('/:nic', async (req, res) => {
  try {
    const farmer = await Farmer.findOne({ nic: req.params.nic });

    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }

    await Crop.deleteMany({ farmerId: farmer._id });

    res.status(200).json({ message: 'All crop data deleted successfully' });
  } catch (err) {
    console.error('Error deleting crops:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;
