import { Router } from "express";
import { MongoCartManager } from "../dao/mongoManagers/mongoCartManager.js";


const cartsRouter = Router()
export const mongoCartManager = new MongoCartManager();

cartsRouter.post('/', async (req, res) => {
    try {
        const response = await mongoCartManager.createCart()
        res.json(response)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

cartsRouter.get('/:cid', async (req, res) => {
    try {
        const id = req.params.cid;
        const response = await mongoCartManager.getCartProducts(id)
        res.json(response)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cart_id = req.params.cid
        const product_id = req.params.pid
        const { quantity } = req.body
        const response = await mongoCartManager.addProductToCart(cart_id, product_id, quantity)
        res.send(response)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

cartsRouter.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const cart_id = req.params.cid
        const product_id = req.params.pid

        const response = await mongoCartManager.deleteProductFromCart(cart_id, product_id)
        res.send(response)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

cartsRouter.delete('/:cid', async (req, res) => {
    try {
        const cart_id = req.params.cid
        const response = await mongoCartManager.deleteProductsFromCart(cart_id)
        res.send(response)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

cartsRouter.put('/:cid/product/:pid', async (req, res) => {
    try {
        const cart_id = req.params.cid
        const product_id = req.params.pid
        const { quantity } = req.body
        const response = await mongoCartManager.updateQuantity(cart_id, product_id, quantity)
        res.send(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
})

export { cartsRouter }