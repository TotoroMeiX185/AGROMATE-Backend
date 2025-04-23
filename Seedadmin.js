//require('bcryptjs').config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../Models/user'); // Make sure path is correct

//const PORT = process.env.PORT || 5000;

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
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await Admin.create({
      NIC: '123456789V',
      password: hashedPassword,
      role: 'admin'
    });
    console.log('✅ Admin user created.');
  } else {
    console.log('⚠️ Admin already exists.');
  }
}
