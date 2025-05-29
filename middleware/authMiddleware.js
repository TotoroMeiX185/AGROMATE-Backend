import pkg from 'jsonwebtoken';
import admin from '../Models/Admin.js';
import Farmer from '../Models/Farmer.js';
//import jwt from'jsonwebtoken';

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
      req.user ={
        id:decoded.id,
        role:decoded.role
      };
      console.log('Decoded token:', decoded); // Log the decoded token for debugging

      let user = await admin.findById(decoded.id).select('-password');
      if (user) {
        user.role = 'admin'; // Add role manually
      } else {
        user = await Farmer.findById(decoded.id).select('-password'); // Add user to req, exclude password
        if (user) user.role = 'farmer'; // Add role manually
      }
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

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
   return next();
  } else{
 return res.status(403).json({ message: 'Admin access required' });
  }
};


