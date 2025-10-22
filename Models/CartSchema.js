const { Schema, model } = require("mongoose");
const dotenv = require("dotenv").config();

const CartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // Linked to the User model
      required: true,
    },

    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product-Listing", 
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true } 
);

const CartModel = model("Cart", CartSchema);
module.exports = CartModel;
