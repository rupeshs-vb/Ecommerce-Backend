const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");

const {
  getUsers,
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/UserController");

router.get("/users", getUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

module.exports = router;
