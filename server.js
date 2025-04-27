
require('dotenv').config();

//const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Assuming you have a db.js file for MongoDB connection
const authRoutes = require('./Routes/authRoutes'); // Assuming you have a routes file for authentication

dotenv.config({ path: './config.env' });
connectDB(); // Connect to MongoDB

const app = express();
app.use(express.json());

// Middleware
app.use(cors()); // Enable CORS for all routes  
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/auth/login', authRoutes); // Authentication routes

// Error handling middleware
//app.use(errorHandler); // Assuming you have an error handler middleware


//app.listen(PORT, () => {
  //console.log(`Server is running on port ${PORT}`);
//});

const connect =async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
    });
    console.log('MongoDB connected!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};
connect();

const seedAdmin = require('./Seedadmin'); // or paste function directly here
const { errorHandler } = require('./middleware/errorMiddleware');
seedAdmin();

// Route (test)
app.get('/login', (req, res) => {
    res.send('Server is running 🚀');
  });
  
  // Start server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(` Server is running on port ${PORT}`);
  });

