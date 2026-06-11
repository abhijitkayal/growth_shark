// aboutus.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default function handler(req, res) {
  // ✅ CORS headers
  res.setHeader(
    "Access-Control-Allow-Origin",
    process.env.FRONTEND_URL || "https://growth-shark-9wit.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, contact, website, service, requirement, revenue } = req.body;

  // ✅ Validation
  if (!name || !email || !contact || !website || !service || !requirement || !revenue) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // ✅ Email content
  const mailOptions = {
    from: process.env.EMAIL_USER,
    replyTo: email,
    to: process.env.EMAIL_TO,
    subject: `New Lead from Contact Form: ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Contact: ${contact}
      Website: ${website}
      Service Interested: ${service}
      Requirement: ${requirement}
      Revenue: ${revenue}
    `,
  };

  // ✅ Send email
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Email error:", err);
      return res.status(500).json({ message: "Error sending email", error: err.message });
    }
    console.log("Message sent:", info.response);
    res.status(200).json({ message: "Form submitted and email sent successfully" });
  });
}
