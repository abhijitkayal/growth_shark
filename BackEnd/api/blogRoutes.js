import express from "express";
import Blog from "../models/Blog.js";
import upload from "../middleware/upload.js";

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

    const blog = await Blog.create({
      title,
      content,
      image: req.file ? req.file.path : "",
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
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

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
    console.error("GET BLOG BY ID ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


export default router;