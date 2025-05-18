import mongoose from 'mongoose';
//import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

// Create a new schema
    const AdminSchema = new mongoose.Schema({
      nic: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      role: { type: String, enum: ['admin', 'farmer'], default: 'farmer', required: true },
    });
    
    // Create a new model
    const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
    

export default Admin;