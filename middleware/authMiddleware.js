import pkg from 'jsonwebtoken';
import admin from '../Models/Admin.js';
import Farmer from '../Models/Farmer.js';

const {verify} = pkg;

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('Token:', token); // Log the token for debugging

      const decoded = verify(token, process.env.JWT_SECRET);
      console.log('Decoded token:', decoded); // Log the decoded token for debugging

      const user = await admin.findById(decoded.id).select('-password') || await Farmer.findById(decoded.id).select('-password'); // Add user to req, exclude password
      
      if(!user) {
        return res.status(401).json({ message: 'Not authorized, no user found' });
      }

      req.user = user; // Attach user to request object
      next(); // Call next middleware

    } catch (error) {
      console.error('Token verification failed:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

};
