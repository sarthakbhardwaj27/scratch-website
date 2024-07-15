const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {generateToken} = require("../utils/generateToken");
const {generatePasswordHash} =  require("../utils/generatePasswordHash");

router.get("/", function (req, res) {
  res.send("Hey");
});

router.post("/register", async function (req, res) {
  try {
    let { email, fullname, password } = req.body;

    //generate hash using controller
    let hash = await generatePasswordHash(password);
    let createdUser = await userModel.create({
      email,
      fullname,
      password: hash,
    });
    // generate jwt token
    if (createdUser) {
      let token = generateToken(createdUser)
      res.cookie("token", token);
      res
        .status(201)
        .send(`Successfully registered: ${createdUser.fullname}`);
      }
    }
    catch (error) {
    console.log(`Error while registering user: ${error}`);
    res.status(500).send(`${error}`);
  }
});

module.exports = router;
