const inventoryPersistence = require("../persistence/inventory-persistence");
const userPersistence = require("../persistence/user-persistence");

// Function to create inventory
exports.createInventory = async (req, res) => {
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

// Function to get all inventories
exports.getInventories = async (page, limit, search) => {
  try {
    const { currentPage, total, inventories } =
      await inventoryPersistence.getAllInventories(page, limit, search);
    return { currentPage, total, inventories };
  } catch (error) {
    console.error("Failed to fetch inventories:", error);
    throw new Error("Failed to fetch inventories");
  }
};

// Function to get inventory by ID
exports.getInventoryById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const inventory = await inventoryPersistence.findById(productId);
    if (inventory) {
      res.status(200).json({ success: true, data: inventory });
    } else {
      res.status(404).json({ success: false, error: "Inventory not found" });
    }
  } catch (error) {
    console.error("Error occurred while fetching inventory by ID:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
exports.deleteById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const inventory = await inventoryPersistence.findById(productId);
    console.log("Found inventory:", inventory);
    if (inventory === null) {
      return { success: false, error: "Inventory not found" };
    }

    // Only attempt deletion if inventory exists
    await inventoryPersistence.deleteById(productId, res);

    return { success: true, message: "Inventory deleted successfully" };
  } catch (error) {
    console.error("Error occurred while deleting inventory:", error);
    return { success: false, error: "Internal server error" };
  }
};

// Function to validate creating inventory
const validateCreateInventory = async (req) => {
  try {
    if (!req || !req.userId) {
      return { success: false, error: "Invalid request" };
    }

    const user = await userPersistence.findById(req.userId);

    if (!user || user.status !== 1) {
      return { success: false, error: "Unauthorized" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error occurred while validating inventory creation:", error);
    throw new Error("Error occurred while validating inventory creation");
  }
};
