const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  NIC: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], required: true },
});

module.exports = mongoose.model('User', userSchema);
