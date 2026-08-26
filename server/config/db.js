const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mnogodb connected successfull");
  } catch (err) {
    console.error("Failed to connect to mongodb", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
