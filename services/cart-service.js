const cartPersistence = require("../persistence/cart-persistence");
const inventoryPersistence = require("../persistence/inventory-persistence");
exports.createCart = async (req, res) => {
  try {
    const inventory = await inventoryPersistence.findById(req.productID);
    console.log("inventory::", inventory);
    if (!inventory) {
      return res
        .status(200)
        .json({ success: false, error: "Invalid Inventory" });
    }
    if (req.id) {
      await cartPersistence.updateCart(req, res);
    } else {
      await cartPersistence.createCart(req, res);
    }
  } catch (error) {
    console.error("Error occurred while creating inventory:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    return (deletedCart = await cartPersistence.deleteCart(req, res));
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

exports.deleteAllCart = async (req, res) => {
  try {
    return (deletedCart = await cartPersistence.deleteCart(req, res));
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await cartPersistence.getCartDetails(req, res);
    return cart;
  } catch (error) {
    console.error("Failed to fetch inventories:", error);
    throw new Error("Failed to fetch inventories");
  }
};
