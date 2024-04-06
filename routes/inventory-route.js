const express = require("express");
const router = express.Router();

const inventoryController = require("../controllers/inventory-controller");

router.post("/inventories", inventoryController.createInventory);
router.get("/getinventories", inventoryController.getAllInventories);
router.get("/getinventory/:productId", inventoryController.getInventoryById);
router.delete("/deleteInventory/:productId", inventoryController.deleteById);

module.exports = router;
