import Admin from '../Models/Admin.js'; // Adjust the path as necessary
import bcrypt from 'bcryptjs';
import Afarmer from '../Models/Afarmer.js';
import {generateToken} from '../Utils/generateToken.js';

export const loginUser = async (req, res, next) => {
try {
  const {nic, password} = req.body;
 
  if (!nic || !password) {
    return res.status(400).json({ message: 'NIC and password are required' });
  }

   const trimmedNic = nic.trim();
  console.log("Login attempt with NIC:", nic , password);
  
    //Try finding user in Admins
    let user = await Admin.findOne({ nic: trimmedNic }).select('+password');
    let role = 'admin';

    //If not found in Admins, try Farmers
    if (!user){
      user = await Afarmer.findOne({ nic: trimmedNic }).select('+password');
      role = 'farmer';
    }
      
    if (!user) {
      return res.status(401).json({ message: 'Invalid NIC or password' });
    }

    console.log("User found:", user);

    // Double-check if user has a password
  if (!user.password) {
    return res.status(500).json({ message: 'User has no password set' });
  }

// Check approval only for farmers
    if (role === 'farmer' && user.status !== 'approved') {
      console.log("Farmer is not approved:", user.nic);
      return res.status(403).json({ message: 'Your account is pending admin approval.' });
    }

    //check password
    const passwordMatch = await bcrypt.compare(password, user.password);  
      console.log("Password comparison result:", passwordMatch);
    if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

    const token = generateToken(user._id);
     console.log('✅ Login successful:', { nic: user.nic, role });
    
     // Successfully logged in
    res.status(200).json({
      "user":{
      id: user._id,
      nic: user.nic,
      role: role,
      },
      token
    });

  } catch (error) {
    console.error('Loggin error:', error);
    next(error);
  }
};


