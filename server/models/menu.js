const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    name: String,
      products: [
        {
          online: Boolean,
          product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }
        }
      ]
    
  },
  {
    timestamps: true
  }
);


module.exports = mongoose.model("Menu", schema);
