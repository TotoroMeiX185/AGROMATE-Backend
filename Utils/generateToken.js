import pkg from 'jsonwebtoken';
//import verify from 'jsonwebtoken';
const { verify, sign } = pkg;
//const { sign } = pkg;

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
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
