const pointTransfer = require("../models/pointTransfer");
const db = require("../config/database");
exports.insertPointTransfer = async (req, t) => {
  try {
    await pointTransfer.create(
      {
        fromCustomerId: req.fromCustomerId,
        transferredPoints: req.transferAmount,
        fromCustomerId: req.fromCustomerId,
        toCustomerId: req.toCustomerId,
      },
      { transaction: t }
    );
  } catch (error) {
    console.error(error);
  }
};
