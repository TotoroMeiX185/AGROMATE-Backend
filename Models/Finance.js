import mongoose, { Schema, model } from 'mongoose';

const FinanceSchema = new Schema({
    farmerId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Farmer',
        required: true
    },
  cropSale: {type:Number, min: 0},
  moneySubsidies: {type:Number, min: 0},
  fertilizerSubsidies: {type:Number, min: 0},
  loan: {type:Number, min: 0},
  otherIncome: {type:Number, min: 0}, 
  seedCost: { type:Number, min: 0},
  fertilizerCost: { type:Number, min: 0},
  laborCost: { type:Number, min: 0},
  transportationCost:   { type:Number, min: 0},
  otherExpenses: { type:Number, min: 0},
  totalIncome: {type:Number, min: 0},
  totalExpenses: {type:Number, min: 0},
  createdAt: { type: Date, default: Date.now }
},{
timestamps:true
});

export default model('Finance', FinanceSchema);
