import { Router } from 'express';
const router = Router();
import { countDocuments, find } from '../Models/Farmer';
import { aggregate } from '../Models/Crop';

// GET /api/admin/stats/registered-farmers
router.get('/registered-farmers', async (req, res) => {
  try {
    const totalFarmers = await countDocuments();
    res.json({ totalFarmers });
  } catch (err) {
    res.status(500).json({ error: 'Error getting farmer count' });
  }
});

// GET /api/admin/stats/total-land-area
router.get('/total-land-area', async (req, res) => {
  try {
    const farmers = await find();
    const totalLandArea = farmers.reduce((sum, farmer) => sum + (farmer.landArea || 0), 0);
    res.json({ totalLandArea });
  } catch (err) {
    res.status(500).json({ error: 'Error getting land area' });
  }
});

// GET /api/admin/stats/subsidies
router.get('/subsidies', async (req, res) => {
  try {
    const farmers = await find({ receivedSubsidy: true });
    const money = farmers.reduce((sum, f) => sum + (f.subsidy.money || 0), 0);
    const fertilizer = farmers.reduce((sum, f) => sum + (f.subsidy.fertilizer || 0), 0);
    res.json({
      totalFarmers: farmers.length,
      money,
      fertilizer
    });
  } catch (err) {
    res.status(500).json({ error: 'Error getting subsidy data' });
  }
});

// GET /api/admin/stats/crops
router.get('/crops', async (req, res) => {
  try {
    const cropsAggregation = await aggregate([
      {
        $group: {
          _id: "$name",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          name: "$_id",
          count: 1,
          _id: 0
        }
      }
    ]);

    res.json({ crops: cropsAggregation });
  } catch (err) {
    res.status(500).json({ error: 'Error getting crops data' });
  }
});

export default router;
