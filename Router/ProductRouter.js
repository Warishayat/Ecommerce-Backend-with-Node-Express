const express = require('express')
const { CreateProduct,GetallProduct,GetSingleProduct,UpdateProduct,deleteProduct } = require("../Controller/ProductController")
const authentication = require("../Middleware/Authentication");
const upload = require('../Middleware/Upload');
const product_router = express.Router();

product_router.post("/createProduct", authentication,upload.single("image"),CreateProduct)
product_router.get("/allproducts",authentication,GetallProduct);
product_router.get("/singleproduct/:id",authentication,GetSingleProduct)
product_router.put("/updateProduct/:id",authentication,upload.single('image'),UpdateProduct)
product_router.delete("/deleteProduct/:id",authentication,deleteProduct)
module.exports = product_router;