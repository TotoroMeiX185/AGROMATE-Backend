const bcrypt = require('bcryptjs');

const passwordToHash = 'admin123'; // <- Replace with your desired plain-text password

bcrypt.hash(passwordToHash, 10).then(hash => {
  console.log('New hashed password:', hash);
});
