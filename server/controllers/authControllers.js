const User = require("../models/User.js");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashPass,
    });

    newUser.password = undefined;

    return res.status(201).json({ message: "Signup sucessfull", newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { signup };
