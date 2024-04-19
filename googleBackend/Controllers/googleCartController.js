const { model } = require("mongoose");
const googleCart = require("../Models/googleCartModel");
const express = require("express");
const router = express.Router();


module.exports.getGoogleCart = async (req, res) => {
  try {

    const gCart = await googleCart.find({}).populate("cartProductID");
    res.status(200).send(gCart);
  } catch (error) {
    res.status(400).send({ "can't find any Cart": error });
  }
};

router.get("/cart/googleCart", module.exports.getGoogleCart);

module.exports.createGoogleCart = async (req, res) => {
  try {
    const googleCarts = req.body;
    const gCart = new googleCart(googleCarts);
    await gCart.save();
    res.status(200).send(gCart);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

router.post("/cart/createGoogleCart", module.exports.createGoogleCart);

module.exports.updateGoogleCart = async (req, res) => {
  try {
    const id = req.params.id;
    const gCart = await googleCart.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).send(gCart);
  } catch (error) {
    res.status(400).send({ error: "can not update Cart" });
  }
};

router.put("/cart/updateGoogleCart/:id", module.exports.updateGoogleCart);

module.exports.deleteGoogleCart = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id : {};
    await googleCart.findByIdAndDelete(id);
    res.status(200).send({ message: "cart deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: "can't delete cart" });
  }
};
router.delete("/cart/deleteGoogleCart/?:id", module.exports.deleteGoogleCart);

module.exports = router;