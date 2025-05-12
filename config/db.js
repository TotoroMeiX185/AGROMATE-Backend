import { connect } from 'mongoose';

const connectDB = async () => {
  try{
    await connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error;
  }
};

export default connectDB;
