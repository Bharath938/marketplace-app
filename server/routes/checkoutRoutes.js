const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware.js");
const { checkout } = require("../controllers/orderController.js");
const router = express.Router();

router.post("/", authMiddleware, checkout);

module.exports = router;
