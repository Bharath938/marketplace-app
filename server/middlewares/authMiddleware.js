const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeaders = req.headers.authorization;

  console.log("hit authMiddle");

  if (!authHeaders || !authHeaders.startsWith("Bearer "))
    return res.status(401).json({ message: "No token provided" });
  const token = authHeaders.split(" ")[1];

  try {
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
