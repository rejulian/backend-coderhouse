// import { MongoCartManager } from "../dao/mongoManagers/mongoCartManager.js";
// export const mongoCartManager = new MongoCartManager();
import { Carts } from "../dao/factory.js"
import { createTicket } from "./ticket.controller.js";
import { productDao } from "./product.controller.js";

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

export const purchaseCart = async (req, res) => {
    try {
        const cart_id = req.params.cid;
        const { purchaser } = req.body;
        if(!purchaser) throw new Error('Cannot purchase without an email')
        let not_abailable_products = []
        let amount = 0

        const cart_products = await cartDao.getCartProducts(cart_id)
        if (cart_products.length === 0) throw new Error("Cannot purchase because there are no products in the cart")

        cart_products.forEach(async (product) => {
            if (product.quantity > product.product_id.stock) {
                not_abailable_products.push(product.product_id._id)
            } else {
                amount += product.quantity * product.product_id.price;
                await productDao.updateProduct(product.product_id._id, {stock: product.product_id.stock-product.quantity})
                // await cartDao.deleteProductFromCart(cart_id, product.product_id._id)
            }
        })
        const newTicket = await createTicket(amount, purchaser)
        res.send(newTicket)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}