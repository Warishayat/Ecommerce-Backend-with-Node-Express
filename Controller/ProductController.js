const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const authentication = require("../Middleware/Authentication");
const { ProductModel } = require("../Models/Products");
const cloudinary = require("../Config/cloudinary");
const upload = require("../Middleware/Upload");

const CreateProduct = async (req, res) => {
    console.log('Product router pr hu')
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only admins can create products.",
      });
    }
    const { title, description, price, category } = req.body;
    console.log(req.user.role);
    console.log('im here at role')
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Product image is required.",
      });
    }

    //save image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "ecommerce-products",
    }); 
    console.log("Cloudinary data is saved")
    //save now in database
    const Product = new ProductModel({
        title,
        description,
        price,
        category,
        image: result.secure_url, 
        created_by: req.user._id,  
    })
    Product.save()
    return res.status(201).json({
        success:true,
        'message' : "Post has been created"
    })
  } catch (error){
    return res.status(500).json({
        success:false,
        message:"Internal Server Error.Try again later."
    })
  }
};

module.exports = {CreateProduct}