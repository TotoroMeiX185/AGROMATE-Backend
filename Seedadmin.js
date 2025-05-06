require('dotenv').config();

const bcrypt = require('bcryptjs');
const Admin = require('./Models/user'); // Make sure path is correct



async function seedAdmin() {
  const existingAdmin = await Admin.findOne({ NIC: '123456789V', role: 'admin' });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10); // Hash the password
    await Admin.create({
      NIC: '123456789V',
      password: 'hashedPassword',
      role: 'admin'
    });
    console.log('✅ Admin user created.');
  } else {
    console.log('⚠️ Admin already exists.');
  }
}
module.exports = seedAdmin;