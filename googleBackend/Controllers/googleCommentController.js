const { model } = require("mongoose");
const googleComment = require("../Models/googleCommentModel");
const express = require("express");
const router = express.Router();


module.exports.getGoogleComment = async (req, res) => {
    try {
     
      const gComment = await googleComment.find({});
      res.status(200).send(gComment);
    } catch (error) {
      res.status(400).send({ "can't find any Cart": error });
    }
  };

router.get("/comment/googleComment", module.exports.getGoogleComment);

module.exports.createGoogleComment = async (req, res) => {
    try {
      const googleComments = req.body;
      const gComment = new googleComment(googleComments);
      await gComment.save();
      res.status(200).send(gComment);
    } catch (error) {
      res.status(400).send({error:error.message});
    }
  };

  router.post("/comment/createGoogleComment", module.exports.createGoogleComment);

  module.exports.updateGoogleComment = async (req, res) => {
    try {
      const id = req.params.id;
      const gComment = await googleComment.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).send(gComment);
    } catch (error) {
      res.status(400).send({ error: "can not update comment" });
    }
  };

  router.put("/comment/updateGoogleComment/:id", module.exports.updateGoogleComment);

  module.exports.deleteGoogleComment = async (req, res) => {
    try {
      const id = req.params.id;
      await googleComment.findByIdAndDelete(id);
      res.status(200).send({ message: "comment deleted successfully" });
    } catch (error) {
      res.status(500).send({ error: "can't delete comment" });
    }
  };
  router.delete("/comment/deleteGoogleComment/:id", module.exports.deleteGoogleComment);

  module.exports = router;