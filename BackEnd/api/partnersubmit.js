import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables from a .env file
dotenv.config();

// Create the Nodemailer transporter using your environment variables
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address from .env
        pass: process.env.EMAIL_PASS, // Your App Password from .env
    },
});

// The API handler function for Express.js
export default async function partnersubmit(req, res) {
    try {
        // Destructure the answers and eligibility from the request body
        const { answers, eligibility } = req.body;

        // Ensure we have the necessary data
        if (!answers || !answers.name || !answers.email) {
            return res.status(400).json({ message: "Missing required form data" });
        }

        // Use the recipient email from the environment variable for better security
        const recipientEmail = process.env.EMAIL_TO; 

        // Generate a clear, formatted email body from the quiz answers.
        const emailBody = `
            <html>
                <body style="font-family: sans-serif; line-height: 1.6;">
                    <h2>New Partner Form Submission</h2>
                    <p><strong>Name:</strong> ${answers.name}</p>
                    <p><strong>Email:</strong> ${answers.email}</p>
                    <p><strong>Business Age:</strong> ${answers.age}</p>
                    <p><strong>Monthly Revenue:</strong> ${answers.revenue}</p>
                    <p><strong>Team Size:</strong> ${answers.team}</p>
                    <p><strong>Time Availability:</strong> ${answers.time}</p>
                    <hr />
                    <h3>Eligibility: ${eligibility}</h3>
                </body>
            </html>
        `;

        // Configure the mail options
        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender address
            replyTo: answers.email, // Allow a direct reply to the user
            to: recipientEmail, // All emails go to this hardcoded address
            subject: `New Partner Form Submission from ${answers.name}`,
            html: emailBody, // Send the HTML-formatted content
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        
        // Return a success response
        return res.status(200).json({ message: "Message sent successfully!" });

    } catch (err) {
        console.error("Nodemailer error:", err);
        return res.status(500).json({
            message: "Error sending email",
            error: err.message,
        });
    }
}
