// utils/mailer.js
import { createTransport } from "nodemailer";

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = (to, fullName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Farmer Registration Approved",
    html: `<p>Hello ${fullName},</p>
           <h1>Welcome to AgroMate</h1>
           <p>Your farmer registration has been approved. You can now log in to the system.</p>
           <p><a href="https://localhost:3000/login">Click here to login</a></p>
           <p>Thank you.</p>`,
  };

  return transporter.sendMail(mailOptions);
};


