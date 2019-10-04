const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    photos: [String],
    tags: [String],
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", schema);
