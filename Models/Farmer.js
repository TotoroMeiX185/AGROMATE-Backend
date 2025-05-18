// models/Farmer.js
import { Schema, model } from 'mongoose';

const farmerSchema = new Schema({
  fullName: { type: String, required: true, trim:true },
  nic: { type: String, required: true, unique: true, trim:true, match: [/^[0-9]{12}[Vv]?$/, 'Invalid NIC format'] },
  dob: { type: Date, required: true, },
  gender: { type: String, required: true, enum:['Male', 'Female'] },
  address: { type: String, required: true, trim:true },
  phone: { type: String, required: true, match: [/^\d{10}$/, 'Phone number must be 10 digits'] },
  email: { type: String, required: true, lowercase: true, match: [/.+\@.+\..+/,'Invalid email address'],trim:true },
  province: { type: String, required: true, trim:true },
  district: { type: String, required: true, trim:true },
  village: { type: String, required: true, trim:true },
  isGovEmployee: { type: Boolean, required: true },
  salaryAbove40k: { type: Boolean, required: true },
  password:{type: String, required: true, minlength:8},
}, { timestamps: true });

const Farmer = model('Farmer', farmerSchema);

export default Farmer;
