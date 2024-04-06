const express = require("express");
const router = express.Router();

// Import user route
const userRoute = require("./user-route");
const inventoryRoute = require("./inventory-route");
const transactionRoute = require("./transaction-route");
const cartRoute = require("./cart-route");
// Main route
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/user", userRoute);
router.use("/inventory", inventoryRoute);
router.use("/transaction", transactionRoute);
router.use("/cart", cartRoute);
module.exports = router;