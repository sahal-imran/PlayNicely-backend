const express = require("express");
const router = express.Router();
const recommendations = require("../models/recommendation");
const LogError = require("../utils/LogError");
const MongoIdChecker = require("../utils/MongoIdChecker");

router.get("/recommendations", async (req, res) => {
  try {
    const data = await recommendations.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/recommendations/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (MongoIdChecker(id)) {
      const recommendation = await recommendations.findById(id);
      if (recommendation) res.status(200).json(recommendation);
      else
        throw new Error(
          `Error route(/recommendations/:id)": Error while getting recommendation`
        );
    } else {
      res.status(404).json({
        message: `Invalid object id received from client which is ${id}`,
      });
    }
  } catch (error) {
    console.log();
    LogError("/recommendations/:id", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
