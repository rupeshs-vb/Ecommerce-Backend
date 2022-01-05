const User = require("../models/User");
const bcrypt = require("bcryptjs");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
};

const registerUser = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;
    if (password === confirmPassword) {
      const registerUserDetails = new User(req.body);
      const token = await registerUserDetails.generateToken();
      res.cookie("jwt", token, {
        httpOnly: true,
      });
      const registeredUser = await registerUserDetails.save();
      res.status(201).send(registerUserDetails);
    } else {
      res.send("Password is not same");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    const isMatch = await bcrypt.compare(password, user.password);
    const token = await user.generateToken();
    res.cookie("jwt", token, {
      httpOnly: true,
    });
    if (isMatch) {
      res.status(200).send({
        message: "Welcome to Home Page",
        data: user,
        token: token,
      });
    } else {
      res.send("Invalid Login Details");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((currentToken) => {
      return currentToken !== req.token;
    });
    res.clearCookie("jwt");
    await req.user.save();
    res.status(201).send("Logout Successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getUsers, registerUser, loginUser, logoutUser };
