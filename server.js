
console.log("starting server.js");

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

const connect =async () => {
  try {
    await mongoose.connect('mongodb+srv://farmerData:2001sa%2A%23@cluster0.8lmqjxp.mongodb.net/farmerSystem?retryWrites=true&w=majority&appName=Cluster0', {
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
    });
    console.log('MongoDB connected!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};
connect();

// Route (test)
app.get('/', (req, res) => {
    res.send('Server is running 🚀');
  });
  
  // Start server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(` Server is running on port ${PORT}`);
  });

