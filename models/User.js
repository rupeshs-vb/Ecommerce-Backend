const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  gender: {
    type: String,
  },
  password: {
    type: String,
  },
  confirmPassword: {
    type: String,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.generateToken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id.toString() },
      "mynameisnikhiljindalandiamfromghaziabad"
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    res.send(`The error part is ${error}`);
  }
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isModified("confirmPassword")) {
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmPassword = this.password;
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
