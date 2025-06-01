import Market from '../Models/Marketprice.js';

//Get all market data(Farmer based)
export const getAllMarketPrices = async (req, res) => {
  try {
    const prices = await Market.find({status:'active'});

    const categorized = {
      grains: [],
      fruits: [],
      cashcrops: [],
      spices: []
    };

    prices.forEach(item => {
      if (item.category && categorized[item.category]) {
        categorized[item.category].push(item);
      }
    });

    res.json(categorized);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch market prices.' });
  }
};


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

// Find most recent expired price
    const lastPrice = await Market.findOne({ crop, category, 
      status: 'expired' }).sort({ updatedAt: -1 });

      let trend = 'stable';
    let change = 0;

    if (lastPrice) {
      change = parseFloat((price - lastPrice.price).toFixed(2));
    
      if(change > 0) trend = 'up';
      else if(change <0) trend = 'down';

      console.log('Last price:', lastPrice?.price);
      console.log('New price:', price);
      console.log('Calculated change:', change);
      console.log('Trend:', trend);
    }

   // Expire the old active price if it exists
    await Market.updateMany({ crop, category, status: 'active' }, { $set: { status: 'expired' } });
  
    
     /* // Expire the old record
      lastPrice.status = 'Expired';
      await lastPrice.save(); // Expire old record*/
    

    const newPrice = new Market({
      crop,
      sinhala,
      price,
      unit,
      category,
      previousPrice: lastPrice?.price || 0,
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
