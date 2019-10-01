const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    status: Boolean,
    name: String,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    photos: [String],
    introdution: String,
    address: String,
    location: {
      type: { type: String, enum: ["Point"] },
      coordinates: { type: [Number] }
    },
    email: String,
    phone: String,
    line_id: String,
    facebook: String,
    instagram: String
  },
  {
    timestamps: true
  }
);
schema.index({ location: "2dsphere" });

module.exports = mongoose.model("Store", schema);
