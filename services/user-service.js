// services/userService.js

const userPersistence = require("../persistence/user-persistence");
const pointTransferPersistence = require("../persistence/point-transfer-persistence");
const sequelize = require("../config/database");

exports.createUsers = async (req, res) => {
  try {
    return await userPersistence.createUser(req, res);
  } catch (error) {
    console.error("Error occurred while creating inventory:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
// Function to process user purchases
exports.pointTransfer = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    await validatePointTransfer(
      req.transferAmount,
      req.fromCustomerId,
      transaction
    );

    await updateFromUserBalance(
      req.transferAmount,
      req.fromCustomerId,
      transaction
    );
    await updateToUserBalance(
      req.transferAmount,
      req.toCustomerId,
      transaction
    );

    await insertPointTransfer(req, transaction);

    await transaction.commit();

    res.status(200).json({ success: true, message: "Purchase successful" });
  } catch (error) {
    console.error("Error occurred while processing purchase:", error);

    await transaction.rollback();

    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const insertPointTransfer = async (req, transaction) => {
  await pointTransferPersistence.insertPointTransfer(req, transaction);
};

const validatePointTransfer = async (
  transferAmount,
  fromCustomerId,

  transaction
) => {
  const fromCustomerBalance =
    await userPersistence.selectWalletBalanceWithRowLock(
      fromCustomerId,
      transaction
    );
  console.log(
    "fromCustomerBalance::",
    fromCustomerBalance,
    "transferAmount::",
    transferAmount
  );
  if (fromCustomerBalance < transferAmount) {
    throw new Error("Insufficient balance");
  }
};

const updateFromUserBalance = async (totalAmount, customerId, transaction) => {
  await userPersistence.minusPointUser(customerId, totalAmount, transaction);
};

const updateToUserBalance = async (totalAmount, customerId, transaction) => {
  await userPersistence.addPointToUser(totalAmount, customerId, transaction);
};
