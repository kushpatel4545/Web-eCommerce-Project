const mongoose = require("mongoose");

const gOrderSchema = new mongoose.Schema({
    orderUserID: String,
    orderProductID: [{ type: mongoose.Schema.Types.ObjectId, ref: "googleProducts" }],
    orderTotal: String,
});

const googleOrder = mongoose.model("googleOrder", gOrderSchema);

module.exports = googleOrder;