const express = require("express");
const router = express.Router();
const recommendations = require("../models/recommendation");

router.get("/recommendations", async (req, res) => {
  try {
    const data = await recommendations.find();
    res.status(400).json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
