import express from "express";
import Portfolio from "../models/portfolio";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const portfolio = new Portfolio(req.body);
    await portfolio.save();

    res.status(201).json({
      success: true,
      data: portfolio,
    });
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;