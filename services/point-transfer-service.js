const inventoryPersistence = require("../persistence/inventory-persistence");
const userPersistence = require("../persistence/user-persistence");

exports.userPurchases = async (req, res) => {
  try {
    const validationResult = await validateCreateInventory(req);
    if (!validationResult.success) {
      return res
        .status(401)
        .json({ success: false, error: validationResult.error });
    }

    if (req.productId) {
      await inventoryPersistence.updateInventory(req, res);
    } else {
      await inventoryPersistence.createInventory(req, res);
    }
  } catch (error) {
    console.error("Error occurred while creating inventory:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Function to validate creating inventory
const validatePurchases = async (req) => {
  try {
    if (!req || !req.userId) {
      return { success: false, error: "Invalid request" };
    }

    const userWalletBalance =
      await userPersistence.selectWalletBalanceWithRowLock(req.userId);

    if (req.totalBalance > userWalletBalance) {
      return { success: false, error: "Insufficient Balance" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error occurred while validating inventory creation:", error);
    throw new Error("Error occurred while validating inventory creation");
  }
};
