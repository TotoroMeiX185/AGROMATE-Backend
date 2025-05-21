import pkg from 'jsonwebtoken';
const { verify, sign } = pkg;


const generateToken = (user) => {
  return sign({ id:user._id, role:user.role }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const verifyToken = (token) =>{
  try{
    const decoded = verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
  
};

export {generateToken, verifyToken};
