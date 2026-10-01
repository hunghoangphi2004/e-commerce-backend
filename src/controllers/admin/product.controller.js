const { Int } = require('mssql');
const db = require('../../../prisma/client.js');
const { AppError } = require("../../utils/errorHandler.js")

const getAllProducts = async (req, res) => {
    try {
        const products = await db.product.findMany({ where: { is_deleted: false } });
        res.status(200).json(products)
    } catch (error) {
        throw new Error(error)
    }
}

const getProductById = async (req, res) => {
    try {
        const productId = parseInt(req.params.id);

        const product = await db.product.findUnique({ where: { product_id: productId } })
        return res.status(200).json(product);
    } catch (err) {
        console.log(err)
    }
}

const createProduct = async (req, res) => {
    try {
        const body = req.body;
        const createdProduct = await db.product.create({
            data: body
        });
        return res.status(200).json(createdProduct);
    } catch (err) {
        throw Error(err);
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
        return res.status(200).json(updatedProduct);
    } catch (err) {
        throw Error(err);
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
        return res.status(200).json("Xoa san pham thanh cong");
    } catch (err) {
        throw Error(err);
    }
}

const changeStatus = async (req, res) => {
    try {
        const status = (req.params.status === "true");
        const id = parseInt(req.params.id);

        await db.product.update({
            where: { product_id: id },
            data: {
                is_active: status
            }
        });
        return res.status(200).json("Doi trang thai thanh cong")
    } catch (err) {
        throw Error(err);
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    editProduct,
    deleteProduct,
    changeStatus
}