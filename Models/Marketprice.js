// models/MarketPrice.js
import mongoose from 'mongoose';

const marketPriceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sinhala: { type: String, required: true },
  category: { type: String, enum: ['grains', 'fruits', 'cashcrops', 'spices'], required: true },
  unit: { type: String, required: true },
  price: { type: Number, required: true },
  previousPrice: { type: Number, default: 0 },
  trend: { type: String, enum: ['up', 'down', 'stable'], default: 'stable' },
  change: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('MarketPrice', marketPriceSchema);
