// controllers/farmerController.js
import Farmer from '../Models/Farmer';
import { hash } from 'bcrypt';

const registerFarmer = async (req, res) => {
  try {
    const {
      fullName,
      nic,
      dob,
      gender,
      address,
      phone,
      email,
      province,
      district,
      village,
      isGovEmployee,
      salaryAbove40k,
      password
    } = req.body;

    //validate input
    if (!fullName || 
      !nic || 
      !dob || 
      !gender || 
      !address || 
      !phone || 
      !email || 
      !province || 
      !district || 
      !village || 
      typeof isGovEmployee !== 'boolean' || 
      typeof salaryAbove40k !== 'boolean' ||
      !password
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);

    // Create new Farmer
    const farmer = new Farmer({
      fullName,
      nic,
      dob,
      gender,
      address,
      phone,
      email,
      province,
      district,
      village,
      isGovEmployee,
      salaryAbove40k,
      password: hashedPassword
    });

    await farmer.save();
    console.log('Registered Farmer:', farmer); // Debugging line
    res.status(201).json({ message: 'Farmer registered successfully!' });
  
    }catch (error) {
    
    //Handle duplicate NIC error
    if (error.code === 11000) {
      return res.status(400).json({ message: 'NIC already exists' });
    }

    //Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', error: error.message });
    }

    console.error(error); 
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }

 console.log('Registered Farmer:', req.body); // Debugging line
};

export default { registerFarmer };
