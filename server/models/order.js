const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    tags: [String],
    arriveTime: Date,
    arriveAddress: String,
    payment: {
      type: String,
      type: String,
      enum: ["LINE", "CASH", "CARD"]
    },
    order: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reciver: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Order", schema);
