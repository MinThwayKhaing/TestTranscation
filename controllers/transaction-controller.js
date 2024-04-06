const transaction = require("../services/transaction-service");

exports.insertTransaction = async (req, res) => {
  try {
    return (result = await transaction.transactionApi(req.body, res));
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
