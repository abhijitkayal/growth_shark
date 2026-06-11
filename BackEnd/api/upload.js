import express from "express";
import cloudinary from "../config/Cloudinary.js";
import upload from "../middleware/upload.js"; // Multer config that stores files in ./uploads

const router = express.Router();

/**
 * POST /api/upload/image
 * Accepts a multipart/form-data request with a single file field named "image".
 * The file is first saved locally by Multer (via the shared upload middleware),
 * then uploaded to Cloudinary. The temporary local file is left on disk – you can
 * add cleanup logic if desired.
 */
router.post("/image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    // Verify Cloudinary configuration is present
    if (!process.env.CLOUDINARY_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error("CLOUDINARY configuration missing");
      return res.status(500).json({ error: "Cloudinary configuration missing" });
    }

    // With memory storage `req.file` contains a buffer instead of a path.
    // Cloudinary can accept a Base64 data‑URI, so we construct one from the
    // buffer and upload that.
    let imageUrl;
    try {
      const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
      const result = await cloudinary.uploader.upload(dataUri, {
        folder: "uploads",
      });
      imageUrl = result.secure_url;
    } catch (cloudErr) {
      console.warn("Cloudinary upload failed:", cloudErr.message);
      // As a fallback, we could serve the file from a temporary location, but
      // in a serverless environment we cannot reliably write to disk. Return a
      // clear error so the client knows the upload failed.
      return res.status(500).json({ error: "Image upload failed" });
    }

    // Respond with the Cloudinary URL.
    res.json({ url: imageUrl });
  } catch (err) {
    console.error("UPLOAD IMAGE ERROR:", err);
    // Forward the Cloudinary error message if available for easier debugging.
    const message = err?.message || err?.response?.data?.error?.message || "Upload failed";
    res.status(500).json({ error: message });
  }
});

export default router;

