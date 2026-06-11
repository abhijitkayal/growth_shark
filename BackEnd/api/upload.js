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

    // Upload the saved file to Cloudinary. Using the file path works with the
    // default Multer disk storage.
    let imageUrl;
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "uploads",
      });
      imageUrl = result.secure_url;
    } catch (cloudErr) {
      console.warn("Cloudinary upload failed, falling back to local file:", cloudErr.message);
      // Serve the file via the static /uploads route defined in index.js
      imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    // Optionally delete the local file after successful upload to keep the
    // uploads folder tidy. If we fell back to local serving, keep the file.
    if (imageUrl && imageUrl.startsWith("https")) {
      try {
        await import("fs").then((fs) => fs.promises.unlink(req.file.path));
      } catch (cleanupErr) {
        console.warn("Failed to delete temporary upload file:", cleanupErr);
      }
    }

    // Respond with the URL (Cloudinary or local) that the frontend can store.
    res.json({ url: imageUrl });
  } catch (err) {
    console.error("UPLOAD IMAGE ERROR:", err);
    // Forward the Cloudinary error message if available for easier debugging.
    const message = err?.message || err?.response?.data?.error?.message || "Upload failed";
    res.status(500).json({ error: message });
  }
});

export default router;

