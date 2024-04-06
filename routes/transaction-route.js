const express = require("express");
const router = express.Router();

const transactionController = require("../controllers/transaction-controller");

router.post("/transactions", transactionController.insertTransaction);

module.exports = router;
