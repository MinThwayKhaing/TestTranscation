// userRoute.js

const express = require("express");
const router = express.Router();

// Import user controller
const userPurchaseController = require("../controllers/user-purchase-controller");

// Insert user route
router.post("/purchases", userPurchaseController.createuserPurchase);

module.exports = router;
