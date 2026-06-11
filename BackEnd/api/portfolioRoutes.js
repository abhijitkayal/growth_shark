// const express = require("express");
import express from "express";
// Use a project‑root‑relative import so Vercel can resolve the file correctly
import Page from "../models/Portfolio.js";
import cloudinary from "../config/Cloudinary.js";

const router = express.Router();

/**
 * Create a portfolio page.
 *
 * The client can send an `image` field that is either:
 *   1. A direct URL (already uploaded to Cloudinary or elsewhere).
 *   2. A Base64‑encoded data URI (e.g. "data:image/png;base64,...").
 *
 * If a Base64 data URI is received we upload it to Cloudinary on the server
 * and replace the field with the secure URL returned by Cloudinary. This removes
 * the previous Multer‑based local file handling.
 */
router.post("/", async (req, res) => {
  try {
    // The client sends a `featuredImage` field (URL) after uploading via /api/upload/image.
    // Previously the code expected an `image` field and attempted to upload a Base64
    // payload to Cloudinary. Since the frontend now provides the URL directly, we simply
    // use the `featuredImage` value. For backward compatibility we also handle an `image`
    // field that may contain a Base64 data URI.
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
    const page = await Page.create({ ...rest, featuredImage: finalImage });
    res.status(201).json(page);
  } catch (error) {
    console.error("PORTFOLIO CREATE ERROR:", error);
    res.status(500).json({ error: error.message || error });
  }
});
router.get("/", async (req, res) => {
  try {
    const pages = await Page.find().sort({
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
    const page = await Page.findOne({
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