import { Router } from 'express';
const router = Router();
import Finance from '../Models/Finance.js';
import { protect} from '../middleware/authMiddleware.js';
import Farmer from '../Models/Farmer.js'; 
//import { createFinanceRecord } from '../Controllers/financeC.js';



router.post('/', protect, async (req, res) => {
  try {
    
    const {
      cropSale = 0,
      moneySubsidies = 0,
      fertilizerSubsidies = 0,
      loan = 0,
      otherIncome =0,
      seedCost= 0,
      fertilizerCost = 0,
      laborCost = 0,
      transportationCost = 0,
      otherExpenses = 0
    } = req.body;

    const farmer = await Farmer.findById(req.user.id);

    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }

    
    // Convert all values to numbers safely
    const safeNum = (val) => parseFloat(val) || 0;

    const totalIncome =
      safeNum(cropSale) +
      safeNum(moneySubsidies) +
      safeNum(fertilizerSubsidies) +
      safeNum(loan) +
      safeNum(otherIncome);

    const totalExpenses =
      safeNum(seedCost) +
      safeNum(fertilizerCost) +
      safeNum(laborCost) +
      safeNum(transportationCost) +
      safeNum(otherExpenses);

    const finance = new Finance({
        farmerId: req.user.id, // Assuming req.user contains the authenticated user's ID
      cropSale: safeNum(cropSale),
      moneySubsidies: safeNum(moneySubsidies),
      fertilizerSubsidies: safeNum(fertilizerSubsidies),
      loan: safeNum(loan),
      otherIncome: safeNum(otherIncome),
      seedCost: safeNum(seedCost),
      fertilizerCost: safeNum(fertilizerCost),
      laborCost: safeNum(laborCost),
      transportationCost: safeNum(transportationCost),
      otherExpenses: safeNum(otherExpenses),
      totalIncome,
      totalExpenses
    });

    await finance.save();

    res.status(200).json({ message: 'Financial data saved', totalIncome, totalExpenses });
     disableSubsidies: isGovEmployee && salaryAbove40k > 40000
  } catch (error) {
    console.error('Error saving financial data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
