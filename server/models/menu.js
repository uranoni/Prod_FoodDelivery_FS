const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    name: String,
    store: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
      products: [
        {
          online: Boolean,
          menuname: { type: mongoose.Schema.Types.ObjectId, ref: "Menu" }
        }
      ]
    
  },
  {
    timestamps: true
  }
);


module.exports = mongoose.model("Menu", schema);
