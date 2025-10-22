const { ProductModel } = require("../Models/Products");

const calculateCartTotal = async (cart) => {
  let total = 0;

  for (const item of cart.products) {
    const product = await ProductModel.findById(item.product);
    if (product) {
      total += product.price * item.quantity;
    }
  }

  cart.totalPrice = total;
};

module.exports = calculateCartTotal;
