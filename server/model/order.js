const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
    receiver: {
        type: String,
        required: true,
        trim: true,

    },
    order: {
        type: String,
        required: true,
        trim: true,

    },
    subaddress: {
        type: String,
        required: true,
        trim: true,
    },
    readdress: {
        type: String,
        required: true,
        trim: true,
    },
    paymethods: {
        type: String,
        required: true,
        trim: true,
    },

});

module.exports = mongoose.model("Order", OrderSchema);