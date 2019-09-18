const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    photos: [String],
    tags: [String],
    maker_id: { type: mongoose.Schema.Types.ObjectId, ref: "Maker" },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", schema);
