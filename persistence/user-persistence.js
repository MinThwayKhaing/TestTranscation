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
    await userModel.increment(
      { walletBalance: points },
      { transaction: t, where: { customerID } }
    );
  } catch (error) {
    console.error("Error occurred during user update:", error);
    throw error;
  }
};

exports.minusPointUser = async (points, customerID) => {
  try {
    // Execute a raw SQL query to increment the walletBalance
    const [affectedRows] = await db.query(
      `UPDATE Users SET walletBalance = walletBalance - :points WHERE customerID = :customerID`,
      {
        replacements: { points, customerID },
      }
    );

    console.log("Affected Rows:", affectedRows);

    if (affectedRows > 0) {
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
    const [user] = await db.query(
      `SELECT walletBalance FROM Users WHERE customerID = :customerId FOR UPDATE`,
      {
        replacements: { customerId },
        type: db.QueryTypes.SELECT,
        lock: true,
        transaction: t,
      }
    );

    return user && user.length ? user[0].walletBalance : null;
  } catch (error) {
    console.error("Error occurred during wallet balance selection:", error);
    throw error;
  }
};
