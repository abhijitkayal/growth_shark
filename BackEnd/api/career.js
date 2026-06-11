import multer from 'multer';
import nodemailer from 'nodemailer';
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Set up multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('resume');

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER, // Gmail address
    pass: process.env.EMAIL_PASS, // App password
  },
});

// API route handler
export default function handler(req, res) {
  // ✅ CORS headers
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL || "https://growth-shark-9wit.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // ✅ Handle file upload
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error during file upload', error: err.message });
    }

    const { name, email, countryCode, whatsapp } = req.body;

    // Validation
    if (!name || !email || !countryCode || !whatsapp || !req.file) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: process.env.EMAIL_CAREER_TO,
      subject: `New Career Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Country Code: ${countryCode}
        WhatsApp: ${whatsapp}
      `,
      attachments: req.file
        ? [{
            filename: req.file.originalname,
            content: req.file.buffer,
          }]
        : [],
    };

    // Send email
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error sending email', error: err.message });
      }
      console.log('Message sent: ' + info.response);
      res.status(200).json({ message: 'Career form submitted and email sent successfully' });
    });
  });
}
