const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getCart,
  addToCart,
  removeFromCart,
} = require("../controllers/cartController");
const router = express.Router();

router.get("/", authMiddleware, getCart);
router.post("/", authMiddleware, addToCart);
router.delete("/:productId", authMiddleware, removeFromCart);

module.exports = router;
