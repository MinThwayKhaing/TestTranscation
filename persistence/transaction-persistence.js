const transactionModel = require("../models/transaction");
const db = require("../config/database");
exports.insertTransaction = async (req, t) => {
  try {
    const newTransaction = await transactionModel.create(
      {
        transaction_amount: req.transactionAmount,
        customer_id: req.userId,
      },
      { transaction: t }
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};
