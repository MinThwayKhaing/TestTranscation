const inventory = require("../services/inventory-service");

exports.createInventory = async (req, res) => {
  try {
    const result = await inventory.createInventory(req.body, res);
    return result;
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
exports.getAllInventories = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const { currentPage, total, inventories } = await inventory.getInventories(
      page,
      limit,
      search
    );

    return res.status(200).json({
      success: true,
      pageNo: currentPage,
      total: total,
      data: inventories,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};
exports.getInventoryById = async (req, res) => {
  try {
    const result = await inventory.getInventoryById(req, res);
    return result;
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const result = await inventory.deleteById(req, res);
    return result;
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};
