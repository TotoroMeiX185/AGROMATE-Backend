require('dotenv').config();

const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
//const connectDB = require('./config/db'); // Assuming you have a db.js file for MongoDB connection
const authRoutes = require('./Routes/authRoutes'); // Assuming you have a routes file for authentication
//const farmedccrRoutes = require('./Routes/farmerRoutes'); // Assuming you have a routes file for farmers
const seedAdmin = require('./Seedadmin'); // Assuming you have a seed file for admin seeding
const { errorHandler } = require('./middleware/errorMiddleware'); // Assuming you have a middleware file for error handling

const app = express();
const PORT = process.env.PORT || 5000;

//connectDB(); // Connect to MongoDB

//Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS for all routes

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
//app.use('/api/farmer', farmerRoutes); // Farmer routes (assuming you have a farmerRoutes file)

// Route (test)
app.get('/login', (req, res) => {
  res.send('Server is running 🚀');
});

//Error hadling
app.use(errorHandler); // Use error handling middleware

//start server only after DB is connected
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected!'); 

    await seedAdmin(); // Seed admin user


    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1); // Exit process with failure
  }
};

connect(); // Start the server


