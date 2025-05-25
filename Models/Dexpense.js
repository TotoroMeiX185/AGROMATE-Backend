import mongoose from 'mongoose';

const { Schema } = mongoose;

const ExpenseSchema = new Schema({
  farmer: { type: Schema.Types.ObjectId, ref: 'Farmer', required: true },
  amount: { type: Number, required: true },
  category: { type: String },
  date: { type: Date, default: Date.now }
});

const Expense = mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);
export default Expense;
