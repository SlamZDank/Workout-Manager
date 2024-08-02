const express = require("express");
const router = express.Router();

// controller functions
const controller = require("../controllers/userController");

// login route
router.post("/login", controller.loginUser);

// signup route
router.post("/signup", controller.signupUser);

module.exports = router;
