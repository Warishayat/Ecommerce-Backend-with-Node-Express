const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const Product = new Schema({
  title: {
    type: String,
    required: [true, "Must enter the title"],
  },
  description: {
    type: String,
    required: [true, "Must enter the description"],
    trim: true,
  },
  image: {
    type: String,
    required: [true, "Must Enter image."],
  },
  price: {
    type: Number,
    required: [true, "Must enter the price"],
  },
  category: {
    type: String,
    default: "general",
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  created_At: {
    type: Date,
    default: Date.now,
  },
});

const ProductModel = model("Product-Listing", Product);
module.exports = { ProductModel };
