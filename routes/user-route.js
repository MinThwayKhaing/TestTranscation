// userRoute.js

const express = require("express");
const router = express.Router();

// Import user controller
const userController = require("../controllers/user-controller");

// Insert user route
router.post("/users", userController.createUser);

module.exports = router;
