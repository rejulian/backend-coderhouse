// import { MongoCartManager } from "../dao/mongoManagers/mongoCartManager.js";
// export const mongoCartManager = new MongoCartManager();
import { Carts } from "../dao/factory.js"

export const cartDao = new Carts()

export const createCart = async (req, res) => {
    try {
        const response = await cartDao.createCart()
        res.json(response)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getCartProducts = async (req, res) => {
    try {
        const id = req.params.cid;
        const response = await cartDao.getCartProducts(id)
        res.json(response)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const addProductToCart = async (req, res) => {
    try {
        const cart_id = req.params.cid
        const product_id = req.params.pid
        const { quantity } = req.body
        const response = await cartDao.addProductToCart(cart_id, product_id, quantity)
        res.send(response)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteProductFromCart = async (req, res) => {
    try {
        const cart_id = req.params.cid
        const product_id = req.params.pid

        const response = await cartDao.deleteProductFromCart(cart_id, product_id)
        res.send(response)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteAllProductsFromCart = async (req, res) => {
    try {
        const cart_id = req.params.cid
        const response = await cartDao.deleteProductsFromCart(cart_id)
        res.send(response)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateProductQuantityFromCart = async (req, res) => {
    try {
        const cart_id = req.params.cid
        const product_id = req.params.pid
        const { quantity } = req.body
        const response = await cartDao.updateQuantity(cart_id, product_id, quantity)
        res.send(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}