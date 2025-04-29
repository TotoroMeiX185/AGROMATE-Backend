
require('dotenv').config();

//const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Assuming you have a db.js file for MongoDB connection
const authRoutes = require('./Routes/authRoutes'); // Assuming you have a routes file for authentication
const farmerRoutes = require('./Routes/farmerRoutes'); // Assuming you have a routes file for farmers

dotenv.config({ path: './config.env' });
connectDB(); // Connect to MongoDB

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS for all routes  

// Routes
app.use('/api/auth/login', authRoutes); // Authentication routes
app.use('/api/farmer', farmerRoutes); // Farmer routes (assuming you have a farmerRoutes file)

// Route (test)
app.get('/login', (req, res) => {
  res.send('Server is running 🚀');
});

//const API_URL = process.env.API_URL || 'http://localhost:5000/api/auth/login';
//const res = await axios.post('${API_URL}/api/farmer/register', formattedData);
//MongoDB connection
const connect =async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};
connect();

//seedAdmin function to create an admin user
const seedAdmin = require('./Seedadmin'); // or paste function directly here
seedAdmin();

//Error handling middleware
const { errorHandler } = require('./middleware/errorMiddleware');
app.use(errorHandler); // Use error handling middleware
app.listen(3000, ()=> console.log('Server is running on port 3000'));
  
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(` Server is running on port ${PORT}`);
});

