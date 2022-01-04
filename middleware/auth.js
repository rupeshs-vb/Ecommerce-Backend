const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(
      token,
      "mynameisnikhiljindalandiamfromghaziabad"
    );
    const userFind = await User.findOne({ _id: verifyUser._id });
    req.token = token;
    req.user = userFind;
    next();
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = auth;
