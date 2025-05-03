require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./Models/user'); // Make sure path is correct

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  seedAdmin().then(() => mongoose.disconnect());
});

async function seedAdmin() {
  const existingAdmin = await Admin.findOne({ NIC: '123456789V', role: 'admin' });
  if (!existingAdmin) {
    await Admin.create({
      NIC: '123456789V',
      password: 'admin123',
      role: 'admin'
    });
    console.log('✅ Admin user created.');
  } else {
    console.log('⚠️ Admin already exists.');
  }
}
module.exports = seedAdmin;