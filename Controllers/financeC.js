import Farmer from '../Models/Farmer.js';
import { protect } from '../middleware/authMiddleware.js';
import { Router } from 'express';
const router = Router();

//Get Farmer profile 
export const getFarmerProfile = async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.user.id).select('isGovEmployee salaryAbove40k');
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }
    res.status(200).json(farmer);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

router.post('/', protect, async (req, res) => {
  try {
    
    // Calculate totals (example)
    const totalIncome =
      Number(req.body.cropSale || 0) +
      Number(req.body.moneySubsidies || 0) +
      Number(req.body.loan || 0) +
      Number(req.body.otherIncome || 0);

    const totalExpenses =
      Number(req.body.seedCost || 0) +
      Number(req.body.fertilizerCost || 0) +
      Number(req.body.laborCost || 0) +
      Number(req.body.transportationCost || 0) +
      Number(req.body.otherExpenses || 0);

    // Save the record as usual...

    // Return the calculated totals in the response
    res.status(200).json({
      message: 'Financial data saved',
      totalIncome,
      totalExpenses
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});