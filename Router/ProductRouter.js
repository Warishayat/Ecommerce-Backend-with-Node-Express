const express = require('express')
const { CreateProduct } = require("../Controller/ProductController")
const authentication = require("../Middleware/Authentication");
const upload = require('../Middleware/Upload');
const product_router = express.Router();

product_router.post("/createProduct", authentication,upload.single("image"),CreateProduct)


module.exports = product_router