import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './Models/user.js'; // Make sure path is correct

dotenv.config();

async function seedAdmin() {
  const existingAdmin = await User.findOne({ nic: '123456789V', role: 'admin' });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10); // Hash the password
    await create({
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