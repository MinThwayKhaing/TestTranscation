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
    fromCustomerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    toCustomerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {}
);

module.exports = PointTransfer;
