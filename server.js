import dotenv from 'dotenv';
import express, { json } from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import authRoutes from './Routes/authRoutes.js'; 
import farmerRoutes from './Routes/farmerRoutes.js'; 
import seedAdmin from './Seedadmin.js'; 
import { errorHandler } from './middleware/errorMiddleware.js'; 
import AfarmerRoutes1 from './Routes/AfarmerRoutes1.js'; 
import weatherRoutes from './Routes/weatherRoute.js'; 
import cropRoute from './Routes/cropRoute.js'; 
import marketRoute from './Routes/marketRoute.js'; 
import financeRoute from './Routes/financeRoute.js'; 
import AcropRoute from './Routes/AcropRoute.js'; 
import Fdashboard from './Routes/Fdashboard.js'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS for all routes

// Routes
app.use('/api/auth', authRoutes); 
app.use('/api/farmer', farmerRoutes); 
app.use ('/api/admin', authRoutes); 
app.use('/api/farmers', AfarmerRoutes1); 
app.use('/api', weatherRoutes); 
app.use('/api/crops', cropRoute); 
app.use('/api/market', marketRoute); 
app.use('/api/finance', financeRoute); 
app.use('/api/crops', AcropRoute); 
app.use('/api/crops',farmerRoutes);
app.use('/api/dashboard',Fdashboard); 


//Error hadling
app.use(errorHandler); // Use error handling middleware

//start server only after DB is connected
const startServer = async () => {
  try {
    await connect(process.env.MONGO_URI);
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

startServer(); // Start the server


