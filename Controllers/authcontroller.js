import admin from '../Models/admin.js';
import bcrypt from 'bcryptjs';
import {generateToken, verifyToken} from '../Utils/generateToken.js';

export const loginUser = async (req, res, next) => {

  const {nic, password} = req.body;
  console.log("Login attempt with NIC:", nic , password);
  try {
    console.log("REQ.BODY:", req.body);
    const { nic, password } = req.body;

    const trimmedNic = nic.trim();
    console.log('Searching NIC:', trimmedNic);

    // TEMP debug: list all NICs
    const allUsers = await admin.find({}, { nic: 1 });
    console.log("All users NICs:", allUsers);

    const user = await admin.findOne({ nic:trimmedNic });
    console.log("User found:", user);


    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);  
      console.log("Password comparison result:", passwordMatch);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      return res.status(401).json({message:'Invalid NIC or password'});
    }


    const token = generateToken(user._id);
    // Successfully logged in
    res.status(200).json({
      user:{
      id: user._id,
      nic: user.nic,
      role: user.role,
      },
      token
    });

  } catch (error) {
    console.error('Loggin error:', error);
    next(error);
  }
};


