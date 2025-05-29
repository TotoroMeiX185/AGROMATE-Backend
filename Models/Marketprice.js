// models/MarketPrice.js
import mongoose from 'mongoose';

const marketPriceSchema = new mongoose.Schema({
  crop: { 
    type: String, 
    required: true 
  },
  sinhala: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    enum: ['grains', 'fruits', 'cashcrops', 'spices'], 
    required: true 
  },
  unit: { 
    type: String, 
    default:'1 Kg' 
  },
  price: { 
    type: Number, 
    required: true 
  },
  previousPrice: { 
    type: Number, 
    default: 0 
  },
  trend: { 
    type: String, 
    enum: ['up', 'down', 'stable'], 
    default: 'stable' 
  },
  change: { 
    type: Number, 
    default: 0 
  },
  status: { 
    type: String, 
    enum: ['active', 'expired'], 
    default: 'active' 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  },
}, {timestamps: true});


export default mongoose.model('MarketPrice', marketPriceSchema);
