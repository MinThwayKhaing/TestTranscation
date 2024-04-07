// persistence/userPersistence.js
const userModel = require("../models/user-model");
const db = require("../config/database");
exports.createUser = async (req, res) => {
  try {
    const user = await userModel.create(req);
    if (user) {
      return res.status(201).json({ success: true, data: user });
    } else {
      return res
        .status(500)
        .json({ success: false, error: "Failed to create user" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

exports.findById = async (userId) => {
  try {
    const user = await userModel.findOne({
      where: { customerID: userId },
      attributes: ["status"],
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

exports.addPointToUser = async (points, customerID, t) => {
  try {
    console.log("points::", points, "customerID::", customerID);
    await userModel.increment(
      { walletBalance: points },
      { transaction: t, where: { customerID } }
    );
  } catch (error) {
    console.error("Error occurred during user update:", error);
    throw error;
  }
};

exports.minusPointUser = async (customerID, points, t) => {
  try {
    console.log("customerID::", customerID, "points", points);
    // Execute a raw SQL query to increment the walletBalance
    const [affectedRows] = await db.query(
      `UPDATE Users SET walletBalance = walletBalance - :points WHERE customerID = :customerID`,
      {
        replacements: { points, customerID },
        transaction: t,
      }
    );
    if (affectedRows.affectedRows > 0) {
      return true;
    } else {
      throw new Error(
        "Failed to update Purchase: User not found or not updated"
      );
    }
  } catch (error) {
    console.error("Error occurred during user update:", error);
    throw error;
  }
};

exports.selectWalletBalanceWithRowLock = async (customerId, t) => {
  try {
    const result = await db.query(
      `SELECT walletBalance FROM Users WHERE customerID = :customerId FOR UPDATE`,
      {
        replacements: { customerId },
        type: db.QueryTypes.SELECT,
        lock: true,
        transaction: t,
      }
    );

    if (result && result.length > 0 && result[0].walletBalance !== undefined) {
      return result[0].walletBalance;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error occurred during wallet balance selection:", error);
    throw error;
  }
};
