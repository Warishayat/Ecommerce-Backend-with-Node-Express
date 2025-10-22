const express = require("express");
const authentication = require("../Middleware/Authentication");
const { addToCart, getCart, updateCartItem, deleteCartItem } = require("../Controller/CartController");

const cart_router = express.Router();

cart_router.post("/addCart", authentication, addToCart);
cart_router.get("/getCart", authentication, getCart);
cart_router.put("/updateCart", authentication, updateCartItem);
cart_router.delete("/deleteCart/:productId", authentication, deleteCartItem);

module.exports = cart_router;
