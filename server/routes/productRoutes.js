const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware.js");
const { createProduct } = require("../controllers/productControllers");
const allowRoles = require("../middlewares/roleMiddleware.js");
const router = express.Router();

router.post("/", authMiddleware, allowRoles("vendor", "admin"), createProduct);

module.exports = router;
