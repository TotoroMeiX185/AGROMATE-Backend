import mongoose, { Schema, model } from 'mongoose';

const FinanceSchema = new Schema({
    farmerId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Farmer',
        required: true
    },
  cropSale: Number,
  moneySubsidies: Number,
  fertilizerSubsidies: Number,
  loan: Number,
  otherIncome: Number,
  seedCost: Number,
  fertilizerCost: Number,
  laborCost: Number,
  transportationCost: Number,
  otherExpenses: Number,
  totalIncome: Number,
  totalExpenses: Number,
  createdAt: { type: Date, default: Date.now }
});

export default model('Finance', FinanceSchema);
