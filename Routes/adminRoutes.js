import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { restrictTo } from '../middleware/roleMiddleware.js';

const router = new express.Router();

// Admin stats routes
router.get('/stats/registered-farmers', protect, restrictTo('admin'), (req, res) => {
  try {
    // Mock data for now
    res.json({ count: 125 });
  } catch (error) {
    console.error('Error fetching registered farmers:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/stats/total-land-area', protect, restrictTo('admin'), (req, res) => {
  try {
    // Mock data for now
    res.json({ area: 1250 });
  } catch (error) {
    console.error('Error fetching total land area:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/stats/subsidies', protect, restrictTo('admin'), (req, res) => {
  try {
    // Mock data for now
    res.json({ amount: 350000 });
  } catch (error) {
    console.error('Error fetching subsidies:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/stats/crops', protect, restrictTo('admin'), (req, res) => {
  try {
    // Mock data for now
    res.json({ cropTypes: ['Rice', 'Corn', 'Wheat', 'Vegetables'], count: 4 });
  } catch (error) {
    console.error('Error fetching crops:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
