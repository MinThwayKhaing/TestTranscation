// userRoute.js

const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cart-controller");

router.post("/carts", cartController.createCart);
router.get("/getcart/:userId", cartController.getCartById);
router.delete("/deleteCart/:id", cartController.deleteById);

module.exports = router;
