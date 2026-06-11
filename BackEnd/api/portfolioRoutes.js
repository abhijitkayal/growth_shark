
import express from "express";

// NOTE: Linux/Render file system is case‑sensitive. The model file is named
// `Portfolio.js` (capital P). Using the wrong case causes `ERR_MODULE_NOT_FOUND`
// in production even though it works locally on Windows.
import Portfolio from "../models/portfolio.js";
import cloudinary from "../config/Cloudinary.js";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    
    const { featuredImage, image, ...rest } = req.body;

    let finalImage = featuredImage;

    // If a Base64 data URI is provided via the legacy `image` field, upload it.
    if (!finalImage && typeof image === "string" && image.startsWith("data:")) {
      const uploadResult = await cloudinary.uploader.upload(image, {
        folder: "portfolio",
      });
      finalImage = uploadResult.secure_url;
    }

    // Persist the page, storing the resolved URL in `featuredImage`.
    const page = await Portfolio.create({ ...rest, featuredImage: finalImage });
    res.status(201).json(page);
  } catch (error) {
    console.error("PORTFOLIO CREATE ERROR:", error);
    res.status(500).json({ error: error.message || error });
  }
});
router.get("/", async (req, res) => {
  try {
    const pages = await Portfolio.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      pages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const page = await Portfolio.findOne({
      permalink: req.params.slug,
    });

    res.json(page);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/portfolio/:permalink", async (req, res) => {
  try {
    const page = await Portfolio.findOne({
      permalink: req.params.permalink,
    });

    if (!page) {
      return res.status(404).json({
        success: false,
        message: "Page not found",
      });
    }

    res.status(200).json({
      success: true,
      page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;