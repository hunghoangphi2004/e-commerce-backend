const express = require('express');
const productRoutes = express.Router();
const ProductController = require('../controllers/product.controller.js');

productRoutes.get("/get-all", ProductController.getAllProducts);
productRoutes.get("/detail-product/:id", ProductController.getProductById);
productRoutes.post("/create-product", ProductController.createProduct);
productRoutes.patch("/edit-product/:id", ProductController.editProduct);
productRoutes.delete("/delete-product/:id", ProductController.deleteProduct);
module.exports = productRoutes;