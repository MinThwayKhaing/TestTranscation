const inventoryPersistence = require("../persistence/inventory-persistence");
const userPersistence = require("../persistence/user-persistence");
const purchaseHistoryPersistence = require("../persistence/purchase-history-persistence");
const sequelize = require("../config/database");

// Function to process user purchases
exports.processUserPurchases = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    await validatePurchase(
      req.totalAmount,
      req.products,
      req.customerId,
      transaction
    );

    await updateInventory(req.products, transaction);

    await updateUserBalance(req.totalAmount, req.customerId, transaction);

    await savepurchasehistory(req, transaction);

    await transaction.commit();

    res.status(200).json({ success: true, message: "Purchase successful" });
  } catch (error) {
    console.error("Error occurred while processing purchase:", error);

    await transaction.rollback();

    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Function to validate purchase
const validatePurchase = async (
  totalAmount,
  products,
  customerId,
  transaction
) => {
  for (const product of products) {
    const quantityAvailable = await inventoryPersistence.checkQuantity(
      product.id,
      transaction
    );
    if (product.quantity >= quantityAvailable) {
      throw new Error("Insufficient quantity");
    }
  }

  const walletBalance = await userPersistence.selectWalletBalanceWithRowLock(
    customerId,
    transaction
  );

  if (walletBalance < totalAmount) {
    throw new Error("Insufficient balance");
  }
};

// Function to update inventory quantities
const updateInventory = async (products, transaction) => {
  for (const product of products) {
    await inventoryPersistence.updateInventoryQuantities(
      product.quantity,
      product.id,
      transaction
    );
  }
};

// Function to update user balance
const updateUserBalance = async (totalAmount, customerId, transaction) => {
  await userPersistence.minusPointUser(customerId, totalAmount, transaction);
};

// Function to update user balance
const savepurchasehistory = async (req, transaction) => {
  for (const product of req.products) {
    await purchaseHistoryPersistence.savePurchaseHistory(
      req.totalAmount,
      product.id,
      req.customerId,
      product.quantity,
      transaction
    );
  }
};
