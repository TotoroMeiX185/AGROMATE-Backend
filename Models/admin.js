import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

async function admin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for admin correction');
    
    // Drop existing users collection to clean up
    try {
      await mongoose.connection.db.dropCollection('users');
      console.log('Users collection dropped');
    } catch (error) {
      console.log('Collection may not exist yet:', error.message);
    }
    
    // Create a new schema
    const userSchema = new mongoose.Schema({
      nic: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      role: { type: String, enum: ['admin', 'farmer'], default: 'farmer', required: true },
    });
    
    // Create a new model
    const User = mongoose.model('User', userSchema);
    
    // Create admin user with correct NIC
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = new User({
      nic: '123456789V', // Using the correct NIC
      password: hashedPassword,
      role: 'admin'
    });
    
    await admin.save();
    console.log('Admin user created with correct NIC:', admin);
    
    // Verify the admin user exists
    const foundAdmin = await User.findOne({ nic: '123456789V' });
    console.log('Admin user found in DB:', foundAdmin);
    
    // Verify password works
    const isMatch = await bcrypt.compare('admin123', foundAdmin.password);
    console.log('Password verification check:', isMatch);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

admin();
