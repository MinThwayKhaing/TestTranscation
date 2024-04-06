// controllers/userController.js

const user = require("../services/user-service");

exports.createUser = async (req, res) => {
  try {
    const result = await user.createUsers(req.body, res);
    return result;
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
