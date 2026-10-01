const express = require('express');
const productRoutes = express.Router();
const productController = require('../../controllers/admin/product.controller.js');
const productValidate = require("../../validates/admin/product.validate.js");

productRoutes.get("/get-all", productController.getAllProducts);
productRoutes.get("/detail-product/:id", productValidate.detailProduct, productController.getProductById);
productRoutes.post("/create-product", productValidate.createProduct, productController.createProduct);
productRoutes.patch("/edit-product/:id", productValidate.editProduct, productController.editProduct);
productRoutes.delete("/delete-product/:id", productValidate.deleteProduct, productController.deleteProduct);
productRoutes.patch("/change-status/:status/:id",productValidate.changeStatus, productController.changeStatus)
module.exports = productRoutes;