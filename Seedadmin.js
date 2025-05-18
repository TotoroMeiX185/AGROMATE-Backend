
import bcrypt from 'bcryptjs';
import Admin from './Models/admin.js'; // Make sure path is correct


async function seedAdmin() {
  try{
  const existingAdmin = await Admin.findOne({ nic: '123456789V', role: 'admin' });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10); // Hash the password
    await Admin.create({
      nic: '123456789V',
      password: hashedPassword,
      role: 'admin'
    });
    console.log('✅ Admin user created.');
  } else {
    console.log('⚠️ Admin already exists.');
  }
} catch (error) {
  console.error('Error seeding admin:', error);
}
}
export default seedAdmin;