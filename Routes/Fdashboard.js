import { Router } from 'express';
import {protect} from '../middleware/authMiddleware.js';
import Crop from '../Models/Crop.js';
import Finance from '../Models/Finance.js';

const router = Router();
// GET /api/dashboard/crops
router.get('/crops', protect, async (req, res) => {

  try {
    const crops = await Crop.find({ farmerId: req.user.id });
    res.json(crops);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching crops' });
  }
});

// GET /api/dashboard/income
router.get('/income', protect, async (req, res) => {

  try {
    const record = await Finance.find({farmerId: req.user.id});
    const totalIncome = record.reduce((sum, record) => sum + Number(record.totalIncome || 0), 0);
     
    res.json({ totalIncome });
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching income' });
  }
});

// GET /api/dashboard/expenses
router.get('/expenses', protect, async (req, res) => {

  try {
    const record = await Finance.find({farmerId: req.user.id});
    const totalExpenses = record.reduce((sum, record) => sum + Number(record.totalExpenses || 0), 0);
   
    res.json({ totalExpenses });
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching expenses' });
  }
});

export default router;
