import { Products } from "../dao/factory.js";
import { generateProduct } from "../mocks/product.mocks.js";
import { io } from "../index.js";

export const productFactory = new Products()

export const getAllProducts = async (req, res) => {
    try {
        const { limit = 10, page = 1, query, sort = 1 } = req.query;
        const response = await productFactory.getProducts(limit, page, query, sort)
        return res.json(response)
    } catch (error) {
        req.logger.error(`${error} - ${new Date().toLocaleString()}`)
        res.json({
            status: "error",
            message: error.message
        })
    }
}

export const getProductById = async (req, res) => {
    try {
        const id = req.params.pid;
        const response = await productFactory.getProductById(id)
        res.json(response)
    } catch (error) {
        req.logger.error(`${error} - ${new Date().toLocaleString()}`)
        res.status(500).json({
            message: error.message
        })
    }
}

export const addProduct = async (req, res) => {
    try {
        const owner = req.session.user.email
        const productAdded = await productFactory.addProduct(req.body, owner);
        io.emit('productAdded', productAdded)
        res.json(productAdded)
    } catch (error) {
        req.logger.error(`${error} - ${new Date().toLocaleString()}`)
        res.status(500).json({
            message: error.message
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const id = req.params.pid;
        const response = await productFactory.updateProduct(id, req.body)
        res.json(response)
    } catch (error) {
        req.logger.error(`${error} - ${new Date().toLocaleString()}`)
        res.status(500).json({
            message: error.message
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.pid;
        const product = await productFactory.getProductById(id)

        if(!product) throw new Error("Producto no encontrado")

        if(req.session.role !== "admin" && product.owner !== req.session.user.email) throw new Error("No puedes borrar un producto que no te pertenece")

        const response = await productFactory.deleteProduct(id)
        res.json(response)
    } catch (error) {
        req.logger.error(`${error} - ${new Date().toLocaleString()}`)
        res.status(500).json({
            message: error.message
        })
    }
}

export const getMockProducts = (req, res) => {
    let products = []
    for (let i = 0; i < 100; i++) {
        products.push(generateProduct())
    }
    return res.json({status:"success", payload: products})
}