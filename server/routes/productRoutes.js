const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware.js");
const {
  createProduct,
  getAllProducts,
  getProductById,
} = require("../controllers/productController.js");
const allowRoles = require("../middlewares/roleMiddleware.js");
const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", authMiddleware, allowRoles("vendor", "admin"), createProduct);

module.exports = router;
