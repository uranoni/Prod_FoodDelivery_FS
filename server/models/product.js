const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    pic: String,
    cal: String,
    tags: [String],
    store: { type: mongoose.Schema.Types.ObjectId, ref: "Store" }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", schema);
