
require('dotenv').config();

//const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

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
seedAdmin();

// Route (test)
app.get('/', (req, res) => {
    res.send('Server is running 🚀');
  });
  
  // Start server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(` Server is running on port ${PORT}`);
  });

