import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import careerRoute from "./api/career.js";
import contactRoute from "./api/contact.js";
import partnersubmitRoute from "./api/partnersubmit.js";
import aboutusRoute from "./api/aboutus.js";
import mailRoute from "./api/mail.js";
import connectToDatabase from "./config/db.js";
import blogRoute from "./api/blogRoutes.js";
import pageRoute from "./api/portfolioRoutes.js";
import uploadRoutes from "./api/upload.js";
import authRoutes from "./api/auth.js";
// import portfolioRoute from "./api/Protfolio.js"
// Load env variables
dotenv.config();
await connectToDatabase();

// 2️⃣ Test if env variables are loading
console.log("EMAIL_USER:", process.env.EMAIL_USER ? "Loaded ✅" : "Missing ❌");
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded ✅" : "Missing ❌");
console.log("FRONTEND_URL:", process.env.FRONTEND_URL ? "Loaded ✅" : "Missing ❌");

// Initialize Express app
const app = express();


// CORS configuration – allow all origins (both production and development)
// Using `origin: true` reflects the request origin in the Access-Control-Allow-Origin header.
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "OPTIONS"], // Explicitly allow common methods
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// ─── Error Handler ───────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err.stack); // 👈 Check your terminal for this
  res.status(500).json({ error: "Something went wrong!", details: err.message });
});

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "uploads" directory so that images can be accessed via URLs like
// https://growth-shark-6uib.onrender.com/uploads/<filename>. This is required for the frontend to display blog images.
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/contact", contactRoute);
app.use("/api/career", careerRoute);
app.use("/api/partnersubmit", partnersubmitRoute); // Use app.use for consistent routing
app.use("/api/aboutus", aboutusRoute);
app.use("/api/mail", mailRoute);
app.use("/api/blogs", blogRoute);
app.use("/api/portfolio", pageRoute);


app.use("/api/upload", uploadRoutes);
app.use("/api/auth", authRoutes);
// app.use("/api/portfolio",portfolioRoute)
console.log("Route registered: /api/mail ✅");
console.log("Route registered: /api/blogs ✅");
// Default route with health check
app.get("/", (req, res) => {
  res.status(200).json({ message: "Backend API is running", status: "healthy" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!", details: err.message });
});

// Export for Vercel (serverless) – Vercel will ignore the listener if present
export default app;

/**
 * Render (and other generic cloud providers) expect the process to bind to a
 * TCP port. In production environments like Render, `process.env.NODE_ENV`
 * is set to "production", so the previous conditional prevented the server from
 * listening, resulting in the "No open ports detected" error.
 *
 * We now always start the HTTP server. Vercel will still work because it
 * prefers the exported handler; the extra `listen` call is ignored in the
 * serverless environment. This makes the same entry point usable for both
 * Render and Vercel.
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));