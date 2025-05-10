import express from 'express';

import { loginUser } from '../Controllers/authcontroller.js';
import { protect } from '../middleware/authMiddleware.js'; // Assuming you have a middleware for authentication
import { restrictTo } from '../middleware/roleMiddleware.js'; // Assuming you have a middleware for role restriction

const router = new express.Router();

router.post('/login', loginUser);
router.get('/admin-data', protect, restrictTo('admin'), (req,res) => {
    res.json({message:'Welcome admin!'});
});

export default router;
