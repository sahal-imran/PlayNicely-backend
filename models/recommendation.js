const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  option: {
    type: String,
  },
  recommendations: {
    type: Array,
  },
});

const recommendation = mongoose.model("recommendation", userSchema);

module.exports = recommendation;
