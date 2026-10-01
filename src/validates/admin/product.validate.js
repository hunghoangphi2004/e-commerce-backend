const { AppError } = require("../../utils/errorHandler");
const db = require('../../../prisma/client.js');

module.exports.detailProduct = async (req, res, next) => {
    const { id } = req.params;

    if (!/^\d+$/.test(id) || id <= 0) {
        throw new AppError("product_id phai la so nguyen lon hon 0", 400);
    }

    const productId = Number(id);

    const product = await db.product.findUnique({
        where: {
            product_id: productId,
            is_deleted: false
        }
    });

    if (!product) {
        throw new AppError("Product khong ton tai", 404);
    }

    next();
}

module.exports.changeStatus = async (req, res, next) => {
    const status = req.params.status;
    const id = parseInt(req.params.id);

    if (status !== "true" && status !== "false") {
        throw new AppError("status phai la true hoac false", 400);
    }

    if (!/^\d+$/.test(id) || id <= 0) {
        throw new AppError("product_id phai la so nguyen lon hon 0", 400);
    }

    const productId = parseInt(id);

    const product = await db.product.findUnique({
        where: {
            product_id: productId,
            is_deleted: false
        }
    });

    if (!product) {
        throw new AppError("Product khong ton tai", 404);
    }

    next();
}

module.exports.createProduct = (req, res, next) => {
    const { title, quantity, list_price, sale_price } = req.body;

    if (!title || title.trim() === "") {
        throw new AppError("Thieu truong: title", 400);
    }

    if (quantity === undefined || quantity === null) {
        throw new AppError("Thieu truong: quantity", 400);
    }

    if (!Number.isInteger(quantity) || quantity < 0) {
        throw new AppError("quantity phai la so nguyen lon hon 0")
    }

    if (list_price === undefined || list_price === null) {
        throw new AppError("Thieu truong: list_price", 400);
    }

    if (typeof list_price !== "number" || list_price < 0) {
        throw new AppError("list_price phai lon hon 0")
    }

    if (sale_price === undefined || sale_price === null) {
        throw new AppError("Thieu truong: sale_price", 400);
    }

    if (typeof sale_price !== "number" || sale_price < 0) {
        throw new AppError("sale_price phai lon hon 0", 400)
    }

    if (sale_price < list_price) {
        throw new AppError("sale_price phai lon hon hoac bang list_price");
    }

    next();
}

module.exports.editProduct = async (req, res, next) => {

    const { id } = req.params;

    if (!/^\d+$/.test(id) || id <= 0) {
        throw new AppError("product_id phai la so nguyen lon hon 0", 400);
    }

    const productId = Number(id);

    const product = await db.product.findUnique({
        where: {
            product_id: productId,
            is_deleted: false
        }
    });

    if (!product) {
        throw new AppError("Product khong ton tai", 404);
    }

    const { title, quantity, description, list_price, sale_price } = req.body;

    if (!title || title.trim() === "") {
        throw new AppError("Thieu truong: title", 400);
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
        throw new AppError("quantity phai la so nguyen lon hon 0", 400);
    }

    if (typeof list_price !== "number" || list_price <= 0) {
        throw new AppError("list_price phai la so lon hon 0", 400);
    }

    if (typeof sale_price !== "number" || sale_price <= 0) {
        throw new AppError("sale_price phai la so lon hon 0", 400);
    }

    if (sale_price > list_price) {
        throw new AppError("sale_price khong duoc lon hon list_price", 400);
    }

    next();
}

module.exports.deleteProduct = async (req, res, next) => {
    const { id } = req.params;

    if (!/^\d+$/.test(id) || id <= 0) {
        throw new AppError("product_id phai la so nguyen lon hon 0", 400);
    }

    const productId = Number(id);

    const product = await db.product.findUnique({
        where: {
            product_id: productId,
            is_deleted: false
        }
    });

    if (!product) {
        throw new AppError("Product khong ton tai", 404);
    }

    next();
}