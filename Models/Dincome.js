import mongoose from 'mongoose';

const { Schema } = mongoose;

const IncomeSchema = new Schema({
  farmer: { type: Schema.Types.ObjectId, ref: 'Farmer', required: true },
  amount: { type: Number, required: true },
  source: { type: String },
  date: { type: Date, default: Date.now }
});

const  Income = mongoose.models.Income || mongoose.model('Income', IncomeSchema);
export default Income;
