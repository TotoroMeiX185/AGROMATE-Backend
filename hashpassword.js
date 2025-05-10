import { compare } from 'bcryptjs';

const storedHash = '$2b$10$c6mUDhoGTMbTygJ/TnlT1eF5QWI3tdqFvxh8b0r1odBlwX.mgYg/u';
const isMatch = await compare('admin123', storedHash);

console.log('Password match?', isMatch);
