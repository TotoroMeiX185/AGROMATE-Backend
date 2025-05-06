const User = require ('../Models/user');
const bcrypt = require('bcryptjs');
const generateToken = require('../Utils/generateToken');

const loginUser = async (req, res, next) => {
  try {
    console.log("REQ.BODY:", req.body);
    const { NIC, password } = req.body;

    const user = await User.findOne({ NIC });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid NIC or password' });
    }

    const token = generateToken(user._id);
    // Successfully logged in
    res.status(200).json({
      user:{
      id: user._id,
      NIC: user.NIC,
      role: user.role,
      },
      token
    });

  } catch (error) {
    console.error('Loggin error:', error);
    next(error);
  }
};

module.exports = { loginUser };
