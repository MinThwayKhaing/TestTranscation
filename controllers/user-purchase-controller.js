const userPurchase = require("../services/user-purchase-service");

exports.createuserPurchase = async (req, res) => {
  try {
    return (result = await userPurchase.processUserPurchases(req.body, res));
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
