import User from '../Models/user.js';
import bcrypt from 'bcryptjs';
import {generateToken, verifyToken} from '../Utils/generateToken.js';

export const loginUser = async (req, res, next) => {
  try {
    console.log("REQ.BODY:", req.body);
    const { nic, password } = req.body;

    console.log("Looking for user with NIC:", nic);
    const user = await User.findOne({ nic: nic.trim() });
    console.log("User found:", user);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid NIC or password' });
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


