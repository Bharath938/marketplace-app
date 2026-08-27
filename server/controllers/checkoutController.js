const Order = require("../models/Order.js");
const Cart = require("../models/Cart.js");
const Product = require("../models/Product.js");

const checkout = async (req, res) => {
  const { id: userId } = req.user;

  const { shippingAddress } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    const totalAmount = cart.items.reduce((acc, curr) => {
      const totalPrice = curr.product.price * curr.quantity;
      return acc + totalPrice;
    }, 0);

    for (let item of cart.items) {
      if (item.product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient Stock for ${item.product.name}, only left ${item.product.stock}`,
        });
      }
    }

    const products = cart.items.map((item) => {
      return {
        product: item.product._id,
        price: item.product.price,
        vendor: item.product.vendor,
        quantity: item.quantity,
      };
    });

    const order = await Order.create({
      user: userId,
      items: products,
      totalAmount,
      shippingAddress,
    });

    for (let item of cart.items) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: { stock: -item.quantity },
      });
    }

    cart.items = [];

    await cart.save();

    res.status(201).json({ message: "Order created", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { checkout };
