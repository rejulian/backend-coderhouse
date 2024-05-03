import { mongoProductManager } from "../index.js";
import { io } from "../index.js";

export const getAllProducts = async (req, res) => {
    try {
        const { limit = 10, page = 1, query, sort = 1 } = req.query;
        const response = await mongoProductManager.getProducts(limit, page, query, sort)
        return res.json(response)
    } catch (error) {
        console.log(error)
        res.json({
            status: "error",
            message: error.message
        })
    }
}

export const getProductById = async (req, res) => {
    try {
        const id = req.params.pid;
        const response = await mongoProductManager.getProductById(id)
        res.json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}

export const addProduct = async (req, res) => {
    try {
        const productAdded = await mongoProductManager.addProduct(req.body);
        io.emit('productAdded', productAdded)
        res.json(productAdded)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const id = req.params.pid;
        const response = await mongoProductManager.updateProduct(id, req.body)
        res.json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.pid;
        const response = await mongoProductManager.deleteProduct(id)
        res.json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}