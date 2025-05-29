import Market from '../Models/Marketprice.js';


// Get all active prices
export const getPrices = async (req, res) => {
  try {
    const prices = await Market.find({ status: 'active' }).sort({ updatedAt: 1 });
    res.json(prices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new price
export const addPrice = async (req, res) => {
  try {
console.log("📥 API HIT: POST /api/market/prices");
console.log("📥 Incoming Request Body:", req.body);


    const { crop, sinhala, price, unit, category } = req.body;

    const existing = await Market.findOne({ crop, status: 'active' });

    let trend = 'stable';
    let change = 0;

    if (existing) {
      change = price - existing.price;
      trend = change > 0 ? 'up' : change < 0 ? 'down' : 'stable';
      existing.status = 'Expired';
      await existing.save(); // Expire old record
    }

    const newPrice = new Market({
      crop,
      sinhala,
      price,
      unit,
      category,
      trend,
      change,
      status:'active',
    });

    console.log("📦 Price being saved:", newPrice);
   const saved = await newPrice.save();
    console.log("✅ Saved to DB:", saved);
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Expire a price
export const expirePrice = async (req, res) => {
  try {
    const priceId = req.params.id;
    const price = await Market.findById(priceId);
    if (!price) return res.status(404).json({ error: 'Price not found' });

    price.status = 'expired';
    await price.save();
    res.json({ message: 'Price marked as expired' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a price
export const deletePrice = async (req, res) => {
  try {
    const priceId = req.params.id;
    await Market.findByIdAndDelete(priceId);
    res.json({ message: 'Price deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
