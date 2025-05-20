import express from 'express';
import MarketPrice from '../Models/Marketprice.js';
import { isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all prices by category
router.get('/:category', async (req, res) => {
  try {
    const prices = await MarketPrice.find({ category: req.params.category });
    res.json(prices);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT to update a product (Admin only)
router.put('/:id', isAdmin, async (req, res) => {
  try {
    const { price, unit } = req.body;
    const item = await MarketPrice.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    const change = price - item.price;
    const trend = change > 0 ? 'up' : change < 0 ? 'down' : 'stable';

    item.previousPrice = item.price;
    item.price = price;
    item.unit = unit;
    item.change = Math.abs(change);
    item.trend = trend;
    item.updatedAt = new Date();

    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
});

export default router;
