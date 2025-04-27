const User = require('../Models/user');

const loginUser = async (req, res, next) => {
  try {
    const { NIC, password } = req.body;

    const user = await User.findOne({ NIC });

    if (!user) {
      return res.status(401).json({ message: 'Invalid NIC or password' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid NIC or password' });
    }

    // Successfully logged in
    res.status(200).json({
      id: user._id,
      NIC: user.NIC,
      role: user.role
    });

  } catch (error) {
    next(error);
  }
};

module.exports = { loginUser };
