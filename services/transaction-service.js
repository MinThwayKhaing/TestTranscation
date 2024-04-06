const config = require("../config/config");
const userPersistence = require("../persistence/user-persistence");
const transcation = require("../persistence/transaction-persistence");
const sequelize = require("../config/database");

exports.transactionApi = async (req) => {
  try {
    const points = await calculatePoints(req.transactionAmount);
    const user = await userPersistence.findById(req.userId);
    if (!user) {
      return console.error("User not Found", error);
      // return res.status(404).json({ success: false, error: "User not Found" });
    }
    await sequelize.transaction(async (t) => {
      await userPersistence.addPointToUser(points, req.userId, t);
      await transcation.insertTransaction(req, t);
    });
  } catch (error) {
    console.error("Error occurred while creating transaction:", error);
  }
};

exports.addPointToUser = async (points, userId) => {
  try {
    // Increment the 'walletBalance' for the user with the given userId
    const [affectedRowsCount] = await userModel.increment("walletBalance", {
      by: points,
      where: { userId: userId },
    });

    // Check if any rows were affected (if the user was found and updated)
    if (affectedRowsCount > 0) {
      return true; // Return true indicating user was updated
    } else {
      return false; // Return false indicating user was not updated
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    // If you want to handle the error externally, you can re-throw it
    throw error;
  }
};

const calculatePoints = (transactionAmount) => {
  const { amountThreshold, pointsPerDollar } = config.pointAllocationRule;

  // Calculate the number of points based on the transaction amount and point allocation rule
  const points =
    Math.floor(transactionAmount / amountThreshold) * pointsPerDollar;

  return points;
};
