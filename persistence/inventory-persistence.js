const inventoryModel = require("../models/inventory");
const db = require("../config/database");
exports.createInventory = async (req, res) => {
  try {
    const newInventory = await inventoryModel.create(req);
    if (newInventory) {
      return res.status(201).json({ success: true, data: newInventory });
    } else {
      return res
        .status(500)
        .json({ success: false, error: "Failed to create inventory" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};
exports.updateInventory = async (req, res) => {
  try {
    const updatedInventory = await inventoryModel.update(req, {
      where: {
        productId: req.productId,
      },
    });
    if (updatedInventory) {
      return res.status(200).json({ success: true, data: updatedInventory });
    } else {
      return res
        .status(500)
        .json({ success: false, error: "Failed to update inventory" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};
exports.getAllInventories = async (page, limit, search) => {
  try {
    const offset = (page - 1) * limit;

    let query = "SELECT productName, productId, price FROM inventories";
    let countQuery = "SELECT COUNT(*) AS total FROM inventories";
    const values = [];
    if (search) {
      query += " WHERE productName LIKE ? AND deletestatus=0";
      countQuery += " WHERE productName LIKE ? AND deletestatus=0";
      values.push(`%${search}%`);
    }
    query += " ORDER BY productId LIMIT ? OFFSET ?";
    values.push(limit, offset);

    const [result, countResult] = await Promise.all([
      db.query(query, {
        replacements: values,
        type: db.QueryTypes.SELECT,
      }),
      db.query(countQuery, {
        replacements: values.slice(0, values.length - 2), // Exclude limit and offset from countQuery
        type: db.QueryTypes.SELECT,
      }),
    ]);

    const total = countResult[0].total;

    const currentPage = page;

    return { currentPage, total, inventories: result };
  } catch (error) {
    throw new Error("Failed to fetch inventories from the database");
  }
};

exports.findById = async (productId) => {
  try {
    const inventory = await inventoryModel.findOne({
      where: { productId: productId, deletestatus: 0 },
    });
    return inventory;
  } catch (error) {
    throw new Error("Failed to find inventory by ID");
  }
};

exports.deleteById = async (id, res) => {
  try {
    const [affectedRows] = await inventoryModel.update(
      { deletestatus: true },
      { where: { productId: id } }
    );
    if (affectedRows > 0) {
      return res
        .status(200)
        .json({ success: true, message: "Inventory deleted successfully" });
    } else {
      return res
        .status(500)
        .json({ success: false, error: "Failed to update inventory" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};
