const cart = require("../services/cart-service");

exports.createCart = async (req, res) => {
  try {
    return (result = await cart.createCart(req.body, res));
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
exports.deleteById = async (req, res) => {
  try {
    const result = await cart.deleteCart(req, res);
    return result;
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

exports.getCartById = async (req, res) => {
  try {
    const result = await cart.getCart(req, res);
    return result;
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};
