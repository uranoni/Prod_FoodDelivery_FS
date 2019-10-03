const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    status: Boolean,
    name: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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
    instagram: String,
    businesshours: {
      MON: {
        start: Number, end: Number
      },
      TUE: {
        start: Number, end: Number
      },
      WED: {
        start: Number, end: Number
      },
      THU: {
        start: Number, end: Number
      },
      FRI: {
        start: Number, end: Number
      },
      SAT: {
        start: Number, end: Number
      },
      SUN: {
        start: Number, end: Number
      },
      menu: [
        {
          online: Boolean,
          menuname: { type: mongoose.Schema.Types.ObjectId, ref: "Menu" }
        }
      ]
    }
  },
  {
    timestamps: true
  }
);
schema.index({ location: "2dsphere" });

module.exports = mongoose.model("Store", schema);
