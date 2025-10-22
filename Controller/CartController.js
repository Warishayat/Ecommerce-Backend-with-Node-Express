const  CartModel  = require('../Models/CartSchema')
const calculateCartTotal = require("../Middleware/PriceCalculate");

const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    let cart = await CartModel.findOne({ user: userId });

    if (!cart) {
      cart = new CartModel({ user: userId, products: [] });
    }
    const existingProduct = cart.products.find(
      (item) => item.product.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity || 1;
    } else {
      cart.products.push({ product: productId, quantity: quantity || 1 });
    }

    await calculateCartTotal(cart);
    await cart.save();
    res.status(201).json({
      success: true,
      message: "Product added to cart successfully.",
      cart,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Try again later.",
    });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await CartModel.findOne({ user: userId }).populate("products.product");
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found.",
      });
    }
    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Try again later.",
    });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    const cart = await CartModel.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found." });
    }

    const item = cart.products.find(
      (p) => p.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ success: false, message: "Product not found in cart." });
    }

    item.quantity = quantity;
    await calculateCartTotal(cart);
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart updated successfully.",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Try again later.",
    });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    const cart = await CartModel.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found." });
    }

    cart.products = cart.products.filter(
      (item) => item.product.toString() !== productId
    );

    await calculateCartTotal(cart);
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product removed from cart.",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Try again later.",
    });
  }
};

module.exports = { addToCart, getCart, updateCartItem, deleteCartItem };
