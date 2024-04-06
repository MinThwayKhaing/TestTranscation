const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const PointTransfer = sequelize.define(
  "PointTransfer",
  {
    transferId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    transferredPoints: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    transferTimestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {}
);

module.exports = PointTransfer;
