const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Transaction = sequelize.define(
  "Transactions",
  {
    transaction_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    from_customer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    transaction_amount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    transactionTimestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {}
);

module.exports = Transaction;
