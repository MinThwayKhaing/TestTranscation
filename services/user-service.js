// services/userService.js

const userPersistence = require("../persistence/user-persistence");

exports.createUsers = async (req, res) => {
  try {
    return await userPersistence.createUser(req, res);
  } catch (error) {
    console.error("Error occurred while creating inventory:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
