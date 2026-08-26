require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRouter = require("./routes/authRoutes.js");
const connectDB = require("./config/db.js");
const protected = require("./middlewares/authMiddleware.js");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRouter);
app.get("/api/protected", protected, async (req, res) => {
  res.status(200).json({ message: "Auth successfull", user: req.user });
});

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Sever is running on port ${PORT}`);
  });
};

startServer();
