const express = require("express");
const User = require("../models/User");
const router = new express.Router();

router.get("/", (req, res) => {
  res.send("Working Fine");
});

router.post("/register", async (req, res) => {
  try {
    const userData = new User(req.body);
    const userCreated = await userData.save();
    res.status(201).send(userCreated);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
