const { model } = require("mongoose");
const googleOrder = require("../Models/googleOrderModel");
const express = require("express");
const router = express.Router();


module.exports.getGoogleOrder = async (req, res) => {
    try {
     
      const gOrder = await googleOrder.find({}).populate("orderProductID");
      res.status(200).send(gOrder);
    } catch (error) {
      res.status(400).send({ "can't find any order": error });
    }
  };

router.get("/order/googleOrder", module.exports.getGoogleOrder);

module.exports.createGoogleOrder = async (req, res) => {
    try {
      const googleOrders = req.body;
      const gOrder = new googleOrder(googleOrders);
      await gOrder.save();
      res.status(200).send(gOrder);
    } catch (error) {
      res.status(400).send({error:error.message});
    }
  };

  router.post("/order/createGoogleOrder", module.exports.createGoogleOrder);

  module.exports.updateGoogleOrder = async (req, res) => {
    try {
      const id = req.params.id;
      const gOrder = await googleOrder.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).send(gOrder);
    } catch (error) {
      res.status(400).send({ error: "can not update order" });
    }
  };

  router.put("/order/updateGoogleOrder/:id", module.exports.updateGoogleOrder);

  module.exports.deleteGoogleOrder = async (req, res) => {
    try {
      const id = req.params.id;
      await googleOrder.findByIdAndDelete(id);
      res.status(200).send({ message: "Order deleted successfully" });
    } catch (error) {
      res.status(500).send({ error: "Order delete order" });
    }
  };
  router.delete("/order/deleteGoogleOrder/:id", module.exports.deleteGoogleOrder);

  module.exports = router;