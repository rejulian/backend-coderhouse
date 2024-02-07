import { Router } from "express";
import { MongoProductManager } from "../dao/mongoManagers/mongoProductManager.js";
// import { productManager } from "../index.js";


const productsRouter = Router()
export const mongoProductManager = new MongoProductManager;

//VER TODOS LOS PRODUCTOS
productsRouter.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        const response = await mongoProductManager.getProducts(limit)
        return res.json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }

})

//VER PRODUCTO POR ID
productsRouter.get('/:pid', async (req, res) => {
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
})

//AGREGAR PRODUCTO
productsRouter.post('/', async (req, res) => {
    try {
        const response = await mongoProductManager.addProduct(req.body)
        res.json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })

    }
})

//ACTUALIZAR PRODUCTO
productsRouter.put('/:pid', async (req, res) => {
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
})

//ELIMINAR PRODUCTO
productsRouter.delete('/:pid', async (req, res) => {
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
})

export { productsRouter }