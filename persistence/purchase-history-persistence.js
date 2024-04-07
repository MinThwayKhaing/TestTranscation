const purchaseHistory = require("../models/purchasehistory");
const db = require("../config/database");

exports.savePurchaseHistory = async (
  totalAmount,
  productId,
  customerId,
  quantity,
  transaction
) => {
  try {
    const newPurchaseHistory = await purchaseHistory.create(
      {
        totalamount: totalAmount,
        productId,
        customerId,
        quantity,
      },
      { transaction }
    );

    return newPurchaseHistory;
  } catch (error) {
    console.error("Error occurred while creating purchase history:", error);
    throw error;
  }
};
