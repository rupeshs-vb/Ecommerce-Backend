const express = require("express");
const router = new express.Router();

const { testing, registerUser } = require("../controllers/UserController");

router.get("/", testing);

router.post("/register", registerUser);

module.exports = router;
