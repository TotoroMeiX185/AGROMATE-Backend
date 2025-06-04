import Farmer from '../Models/Farmer.js';
import { protect } from '../middleware/authMiddleware.js';
import { Router } from 'express';
const router = Router();
import Finance from '../Models/Finance.js';

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

// GET finance data by NIC
export const getFinanceByNIC = async (req, res) => {
  try {
    
    console.log('HIT GET /api/finance/:nic');
    const { nic } = req.params;

    const farmer = await Farmer.findOne({ nic });
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found with this NIC' });
    }

    const finance = await Finance.find({farmerId:farmer._id }).populate('farmerId', 'name nic'); // Assuming farmerId is the NIC in your schema
    
    if (!finance || finance.length === 0) {
      return res.status(404).json({ message: 'Finance data not found for this NIC' });
    }
    res.status(200).json(finance);
  } catch (error) {
     console.error('Error fetching finance data:', error.message);
    res.status(500).json({ message: 'Server error while fetching finance data' });
  }
};

// DELETE finance record by NIC
export const deleteFinanceByNIC = async (req, res) => {
  try {
    const { nic } = req.params;

    const farmer = await Farmer.findOne({ nic });
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }

    const deleted = await Finance.findOneAndDelete({ farmerId: farmer._id });
    if (!deleted) {
      return res.status(404).json({ message: 'No finance record found to delete' });
    }
    res.status(200).json({ message: 'Finance record deleted successfully' });
  } catch (error) {
    console.error('Error deleting finance data:', error.message);
    res.status(500).json({ message: 'Server error while deleting finance data' });
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