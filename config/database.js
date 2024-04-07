// config/database.js

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("test", "root", "root", {
  host: "localhost",
  // host: "150.95.82.125",
  dialect: "mysql",
  // logging: console.log,
  logging: false,
});

module.exports = sequelize;
