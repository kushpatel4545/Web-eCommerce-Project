
const mongoose = require("mongoose");

const gProductSchema = new mongoose.Schema({
    productName:String,
    productDescription:String,
    productImage:String,
    productPrice:Number,
    productShippingCost:Number,
},
{
    strict: false  // Disables strict schema validation
});

const googleProduct = mongoose.model("googleProducts", gProductSchema);

module.exports = googleProduct;