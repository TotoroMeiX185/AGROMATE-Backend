// models/Farmer.js
const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim:true },
  nic: { type: String, required: true, unique: true },
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

const Farmer = mongoose.model('Farmer', farmerSchema);

module.exports = Farmer;
