import express from "express";
import Blog from "../models/Blog.js";
import upload from "../middleware/upload.js";
import cloudinary from "../config/Cloudinary.js";

const router = express.Router();

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const {
      title,
      content,
      metaTitle,
      metaDescription,
      keywords,
      permalink,
      schema,
    } = req.body;

    // ✅ Safe schema parsing
    let parsedSchema = {};
    if (schema) {
      try {
        parsedSchema = typeof schema === "string" ? JSON.parse(schema) : schema;
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: "Invalid JSON in schema",
        });
      }
    }

    // ------------------------------------------------------------
    // Handle image upload
    // ------------------------------------------------------------
    let imageUrl = "";
    if (req.file) {
      try {
        // Convert buffer to data URI for Cloudinary upload
        const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
        const result = await cloudinary.uploader.upload(dataUri, {
          folder: "uploads",
        });
        imageUrl = result.secure_url;
      } catch (uploadErr) {
        console.warn("Cloudinary upload failed in blog create:", uploadErr.message);
        // Continue without image rather than failing the whole request
        imageUrl = "";
      }
    }

    const blog = await Blog.create({
      title,
      content,
      image: imageUrl,
      metaTitle,
      metaDescription,
      keywords: keywords ? keywords.split(",").map((k) => k.trim()) : [],
      permalink,
      schema: parsedSchema,
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });

  } catch (error) {
    console.error("BLOG ERROR:", error.message); // ✅ No undefined variable
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    console.error("GET BLOGS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
router.get("/permalink/:permalink", async (req, res) => {
  try {
    const blog = await Blog.findOne({
      permalink: req.params.permalink,
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error("GET BLOG ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;