const { Int } = require('mssql');
const db = require('../../prisma/client.js');
const { AppError } = require("../utils/errorHandler.js")

const getAllProducts = async (req, res) => {
    const products = await db.product.findMany({ where: { is_deleted: false } });
    res.send("Lay tat ca san pham");
}

const getProductById = async (req, res) => {
    const productId = parseInt(req.params.id);

    if (isNaN(productId)) {
        throw new AppError("Sai dinh dang product_id", 400);
    }

    const product = await db.product.findUnique({ where: { product_id: productId } })
    if (!product) {
        throw new AppError("Khong tim thay san pham", 404);
    }
    return res.status(200).json(product);
}

const createProduct = async (req, res) => {
    try {
        const body = req.body;
        const createdProduct = await db.product.create({
            data: body
        });
        res.send(body)
    } catch (err) {
        throw Error(err);
        console.log("Co loi xay ra khi tao san pham")
    }
}

const editProduct = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const body = req.body;
        const updatedProduct = await db.product.update({
            where: { product_id: id },
            data: body
        })
        res.send(updatedProduct);
    } catch (err) {
        throw Error(err);
        console.log("Co loi xay ra khi cap nhat san pham");
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await db.product.update({
            where: { product_id: id },
            data: {
                is_deleted: true
            }
        });
        res.send(id)
    } catch (err) {
        throw Error(err);
        console.log("Co loi xay ra khi xoa san pham")
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    editProduct,
    deleteProduct
}