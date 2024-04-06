const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Inventory = sequelize.define(
  "Inventory",
  {
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    deletestatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    // Other model options (timestamps, etc.)
  }
);

module.exports = Inventory;
