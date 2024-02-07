import { Router } from "express";
import { MongoCartManager } from "../dao/mongoManagers/mongoCartManager.js";


const cartsRouter = Router()
const mongoCartManager = new MongoCartManager;

cartsRouter.post('/', async (req, res) => {
    try {
        const response = await mongoCartManager.createCart()
        res.json(response)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

cartsRouter.get('/:cid', async (req, res) => {
    const id = req.params.cid;

    try {
        const response = await mongoCartManager.getCartProducts(id)
        res.json(response)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    const cart_id = req.params.cid
    const product_id = req.params.pid
    const { quantity } = req.body

    try {
        const response = await mongoCartManager.addProductToCart(cart_id, product_id, quantity)
        res.send(response)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export { cartsRouter }