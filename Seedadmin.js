import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import admin from '../Models/admin.js'; // Make sure path is correct

dotenv.config();

async function seedAdmin() {
  const existingAdmin = await admin.findOne({ nic: '123456789V', role: 'admin' });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10); // Hash the password
    await admin.create({
      nic: '123456789V',
      password: hashedPassword,
      role: 'admin'
    });
    console.log('✅ Admin user created.');
  } else {
    console.log('⚠️ Admin already exists.');
  }
}
export default seedAdmin;