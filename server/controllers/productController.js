const Product = require("../models/Product.js");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate("vendor", "name email");

    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  const { id: productId } = req.params;
  try {
    const product = await Product.findById(productId).populate(
      "vendor",
      "name email",
    );

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      vendor: req.user.id,
    });

    res.status(201).json({ message: "Product created", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllProducts, getProductById, createProduct };
