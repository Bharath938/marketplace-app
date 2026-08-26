const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/authControllers.js");
const protected = require("../middlewares/authMiddleware.js");

router.post("/signup", signup);
router.post("/login", login);
router.get("/protected", protected, async (req, res) => {
  res.status(200).json({ message: "Auth successfull", user: req.user });
});

module.exports = router;
