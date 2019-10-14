const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    photos: String,
    tags: [String],
    arriveTime: Date,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Order", schema);
