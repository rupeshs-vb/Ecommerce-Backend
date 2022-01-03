const User = require("../models/User");

const testing = (req, res) => {
  res.send("Working Fine");
};

const registerUser = async (req, res) => {
  try {
    const userData = new User(req.body);
    const userCreated = await userData.save();
    res.status(201).send(userCreated);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { testing, registerUser };
