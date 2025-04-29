// models/Farmer.js
const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  nic: { type: String, required: true, unique: true },
  dob: { type: Date, required: true, },
  gender: { type: String, required: true, },
  address: { type: String, required: true, },
  phone: { type: String, required: true, match: [/^\d{10}$/, 'Phone number must be 10 digits'] },
  email: { type: String, required: true, lowercase: true, match: [/.+\@.+\..+/,'Invalid email address'] },
  province: { type: String, required: true },
  district: { type: String, required: true },
  village: { type: String, required: true },
  isGovEmployee: { type: Boolean, required: true },
  salaryAbove40k: { type: Boolean, required: true },
}, { timestamps: true });

const Farmer = mongoose.model('Farmer', farmerSchema);

module.exports = Farmer;
