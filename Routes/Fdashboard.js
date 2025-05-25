import { Router } from 'express';
const router = Router();
import Crops from '../Models/Dcrops.js';
import Income from '../Models/Dincome.js';
import Expense from '../Models/Dexpense.js';
import {protect} from '../middleware/authMiddleware.js';

// GET /api/dashboard/crops
router.get('/crops', protect, async (req, res) => {

  try {
    const crops = await Crops.find({ farmer: req.user.id });
    res.json(crops);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching crops' });
  }
});

// GET /api/dashboard/income
router.get('/income', protect, async (req, res) => {

const amount = req.query.amount;

  try {
    const filter = {farmer: req.user.id};
    if (amount !== undefined) filter.amount = amount; 
    const incomes = await Income.find(filter);
    const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
     
    res.json({ totalIncome });
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching income' });
  }
});

// GET /api/dashboard/expenses
router.get('/expenses', protect, async (req, res) => {

  const amount = req.query.amount;

  try {
    const filter = {farmer: req.user.id};
    if (amount !== undefined) filter.amount = amount;
    const expenses = await Expense.find(filter);
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
   
    res.json({ totalExpenses });
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching expenses' });
  }
});

export default router;
