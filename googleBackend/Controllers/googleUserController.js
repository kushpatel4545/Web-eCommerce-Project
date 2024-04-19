const { model } = require("mongoose");
const googleUser = require("../Models/googleUserModel");
const express = require("express");
const router = express.Router();


module.exports.getGoogleUser = async (req, res) => {
  try {

    const gUser = await googleUser.find({});
    res.status(200).send(gUser);
  } catch (error) {
    res.status(400).send({ "can't find any user": error });
  }
};

router.get("/user/googleUser", module.exports.getGoogleUser);

module.exports.getLoginUserData = async (req, res) => {
  try {
    const userEnterData = req.body;
    const gUser = await googleUser.findOne({ userEmail: userEnterData.useremail, password: userEnterData.loginPassword });
    gUser ? res.status(200).send("Login Successfull") : res.status(404).send("User Not Found");

  } catch (error) {
    res.status(400).send({ error });
  }
};


router.post("/user/checkUserDetails", module.exports.getLoginUserData);

module.exports.createGoogleUser = async (req, res) => {
  try {
    const googleuser = req.body;
    const gUser = new googleUser(googleuser);
    await gUser.save();
    res.status(200).send(gUser);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

router.post("/user/createGoogleUser", module.exports.createGoogleUser);

module.exports.updateGoogleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const gUser = await googleUser.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).send(gUser);
  } catch (error) {
    res.status(400).send({ error: "can not update User" });
  }
};

router.put("/user/updateGoogleUser/:id", module.exports.updateGoogleUser);

module.exports.deleteGoogleUser = async (req, res) => {
  try {
    const id = req.params.id;
    await googleUser.findByIdAndDelete(id);
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: "can't delete User" });
  }
};
router.delete("/user/deleteGoogleUser/:id", module.exports.deleteGoogleUser);

module.exports = router;