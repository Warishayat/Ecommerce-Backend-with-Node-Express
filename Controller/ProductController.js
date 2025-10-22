const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const authentication = require("../Middleware/Authentication");
const { ProductModel } = require("../Models/Products");
const cloudinary = require("../Config/cloudinary");
const upload = require("../Middleware/Upload");

const CreateProduct = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only admins can create products.",
      });
    }
    const { title, description, price, category } = req.body;
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Product image is required.",
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "ecommerce-products",
    });
    const Product = new ProductModel({
      title,
      description,
      price,
      category,
      image: result.secure_url,
      created_by: req.user._id,
    });
    Product.save();
    return res.status(201).json({
      success: true,
      message: "Post has been created Successfully.",
      new_product: Product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.Try again later.",
    });
  }
};

const GetallProduct = async (req, res) => {
  try {
    const all_products = await ProductModel.find();
    if (!all_products) {
      return res.status(409).json({
        success: false,
        message: "No Product Found.",
      });
    }
    return res.status(201).json({
      success: true,
      products: all_products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Invalid Error. Try again later.",
    });
  }
};

const GetSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const _product = await ProductModel.findById(id);
    if (!_product) {
      return res.status(404).json({
        success: false,
        message: "No product found.Try some other products",
      });
    }
    return res.status(200).json({
      success: true,
      product: _product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internel Server Error,Try again later.",
    });
  }
};

const UpdateProduct = async (req, res) => {
  try {
    const role = req.user.role;
    if (role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can make or update the products",
      });
    }
    const id = req.params.id;
    const findProduct = await ProductModel.findById(id);
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "No Product Found.",
      });
    }
    const { title, description, price, category } = req.body;
    if (!req.file) {
      return res.status(400).json({
        message: "Product image is required",
      });
    }
    const saveimage = await cloudinary.uploader.upload(req.file.path, {
      folder: "ecommerce-products",
    });
    const update_product = await ProductModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        category,
        image: saveimage.secure_url,
        created_by: req.user._id,
      },
      { new: true }
    );
    return res.status(201).json({
      success: true,
      message: "Product has been updated successfully.",
      product: update_product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internel Server Error. Try again later.",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const role = req.user.role;
    if (role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can create delete the Product",
      });
    }
    const id = req.params.id;
    const find_product = await ProductModel.findById(id);
    if (!find_product) {
      return res.status(404).json({
        success: false,
        message: "No Record Found",
      });
    }
    const dlt_prod = await ProductModel.findByIdAndDelete(id);
    if (!dlt_prod) {
      return res.status(404).json({
        success: false,
        message: "No Data Found.",
      });
    }
    return res.status(201).json({
      success: true,
      message: "Product has beend deleted",
      delete_product: dlt_prod,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internel Server Error. Try again later.",
    });
  }
};
module.exports = {CreateProduct,GetallProduct,GetSingleProduct,UpdateProduct,deleteProduct}