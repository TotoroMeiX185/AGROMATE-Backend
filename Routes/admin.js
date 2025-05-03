const express = require('express');
const router = express.Router();
const User = require('../Models/user'); // correct path

router.post('/login', async (req, res) => {
  const { NIC, password } = req.body;

  try {
    const user = await User.findOne({ NIC });

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        message: 'Login successful!',
        user: {
          NIC: user.NIC,
          role: user.role
        }
      });
    } else {
      res.status(401).json({ message: 'Invalid NIC or Password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

module.exports = router;
