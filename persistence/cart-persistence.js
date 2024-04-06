const cartModel = require("../models/cart");
const { QueryTypes } = require("sequelize");
const sequelize = require("../config/database");
const productModel = require("../models/inventory");
exports.createCart = async (req, res) => {
  try {
    const newCart = await cartModel.create(req);
    if (newCart) {
      return res.status(201).json({ success: true, data: newCart });
    } else {
      return res
        .status(500)
        .json({ success: false, error: "Failed to create cart" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const updatedCart = await cartModel.update(req, {
      where: {
        productId: req.id,
      },
    });
    if (updatedCart) {
      return res.status(200).json({ success: true, data: updatedCart });
    } else {
      return res
        .status(500)
        .json({ success: false, error: "Failed to update cart" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};
exports.deleteCart = async (req, res) => {
  try {
    const cartId = req.params.id;
    const deletedCart = await cartModel.destroy({
      where: {
        id: cartId,
      },
    });
    if (deletedCart) {
      return res.status(200).json({ success: true, data: deletedCart });
    } else {
      return res
        .status(404)
        .json({ success: false, error: "Cart item not found" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

exports.getCartDetails = async (req, res) => {
  try {
    const customerId = req.params.userId;
    const query = `
      SELECT c.customerID, c.quantity, c.id AS cartId, c.createdAt, p.productName AS productName
      FROM Carts c
      JOIN Inventories p ON c.productID = p.productId
      WHERE c.customerID = :customerId
    `;

    const cartDetails = await sequelize.query(query, {
      replacements: { customerId },
      type: QueryTypes.SELECT,
    });

    return res.status(200).json({ success: true, data: cartDetails });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

exports.deleteAllCart = async (req, res) => {
  try {
    const customerID = req.params.customerID;
    const deletedCart = await cartModel.destroy({
      where: {
        customerID: customerID,
      },
    });
    if (deletedCart) {
      return res.status(200).json({ success: true, data: deletedCart });
    } else {
      return res
        .status(404)
        .json({ success: false, error: "Cart item not found" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};
