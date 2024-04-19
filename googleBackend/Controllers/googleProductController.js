const { model } = require("mongoose");
const googleProduct = require("../Models/googleProductsModel");
const express = require("express");
const router = express.Router();


module.exports.getGoogleProdctData = async (req, res) => {
    try {
     
      const gProduct = await googleProduct.find({});
      res.status(200).send(gProduct);
    } catch (error) {
      res.status(400).send({ "can't find any product": error });
    }
  };

router.get("/product/googleProduct", module.exports.getGoogleProdctData);

module.exports.createGoogleProduct = async (req, res) => {
    try {
      const googleProductData = req.body;
      const gProduct = new googleProduct(googleProductData);
      await gProduct.save();
      res.status(200).send(gProduct);
    } catch (error) {
      res.status(400).send({error:error.message});
    }
  };

  router.post("/product/createGoogleProduct", module.exports.createGoogleProduct);

  module.exports.updateGoogleProduct = async (req, res) => {
    try {
      const id = req.params.id;
      const gProduct = await googleProduct.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).send(gProduct);
    } catch (error) {
      res.status(400).send({ error: "can not update product" });
    }
  };

  router.put("/product/updateGoogleProduct/:id", module.exports.updateGoogleProduct);

  module.exports.deleteGoogleProduct = async (req, res) => {
    try {
      const id = req.params.id;
      await googleProduct.findByIdAndDelete(id);
      res.status(200).send({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).send({ error: "can't delete product" });
    }
  };
  router.delete("/product/deleteGoogleProduct/:id", module.exports.deleteGoogleProduct);

  module.exports = router;