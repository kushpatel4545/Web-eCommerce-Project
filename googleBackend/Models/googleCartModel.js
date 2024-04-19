const mongoose = require("mongoose");

const gCartSchema = new mongoose.Schema({
    cartUserID: String,
    cartProductID: { type: mongoose.Schema.Types.ObjectId, ref: "googleProducts" },
    productQty: Number,

},
{
    strict: false  // Disables strict schema validation
});

const googleCart = mongoose.model("googleCart", gCartSchema);

module.exports = googleCart;