// controllers/farmerController.js
const Farmer = require('../Models/Farmer');

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
      salaryAbove40k
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
      (isGovEmployee == undefined) || 
      (salaryAbove40k == undefined)
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

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
      salaryAbove40k
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

module.exports = { registerFarmer };
