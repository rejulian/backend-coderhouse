// import { MongoCartManager } from "../dao/mongoManagers/mongoCartManager.js";
// export const mongoCartManager = new MongoCartManager();
import { Carts } from "../dao/factory.js"
import { createTicket } from "./ticket.controller.js";
import { productFactory } from "./product.controller.js";

export const cartFactory = new Carts()

export const createCart = async (req, res) => {
    try {
        const response = await cartFactory.createCart()
        res.json(response)
    } catch (error) {
        req.logger.error(`${error} - ${new Date().toLocaleString()}`)
        res.status(500).json({ message: error.message })
    }
}

export const getCartProducts = async (req, res) => {
    try {
        const id = req.params.cid;
        const response = await cartFactory.getCartProducts(id)
        res.json(response)
    } catch (error) {
        req.logger.error(`${error} - ${new Date().toLocaleString()}`)
        res.status(500).json({ message: error.message })
    }
}

export const addProductToCart = async (req, res) => {
    try {
        const cart_id = req.params.cid
        const product_id = req.params.pid
        const { quantity } = req.body

        const product = await productFactory.getProductById(product_id)

        // if(product.owner === req.session.user.email) throw new Error("No puedes agregar este producto al carrito ya que te pertenece")

        const response = await cartFactory.addProductToCart(cart_id, product_id, quantity)
        res.send(response)
    } catch (error) {
        req.logger.error(`${error} - ${new Date().toLocaleString()}`)
        res.status(500).json({ message: error.message })
    }
}

export const deleteProductFromCart = async (req, res) => {
    try {
        const cart_id = req.params.cid
        const product_id = req.params.pid

        const response = await cartFactory.deleteProductFromCart(cart_id, product_id)
        res.send(response)
    } catch (error) {
        req.logger.error(`${error} - ${new Date().toLocaleString()}`)
        res.status(500).json({ message: error.message })
    }
}

export const deleteAllProductsFromCart = async (req, res) => {
    try {
        const cart_id = req.params.cid
        const response = await cartFactory.deleteProductsFromCart(cart_id)
        res.send(response)
    } catch (error) {
        req.logger.error(`${error} - ${new Date().toLocaleString()}`)
        res.status(500).json({ message: error.message })
    }
}

export const updateProductQuantityFromCart = async (req, res) => {
    try {
        const cart_id = req.params.cid
        const product_id = req.params.pid
        const { quantity } = req.body
        const response = await cartFactory.updateQuantity(cart_id, product_id, quantity)
        res.send(response)
    } catch (error) {
        req.logger.error(`${error} - ${new Date().toLocaleString()}`)
        res.status(500).json({ message: error.message })
    }
}

export const purchaseCart = async (req, res) => {
    try {
        const cart_id = req.params.cid;
        const { purchaser } = req.body;
        if(!purchaser) throw new Error('Cannot purchase without an email')
        let not_available_products = []
        let amount = 0

        const cart_products = await cartFactory.getCartProducts(cart_id)
        if (cart_products.length === 0) throw new Error("Cannot purchase because there are no products in the cart")

        cart_products.forEach(async (product) => {
            if (product.quantity > product.product_id.stock) {
                not_available_products.push(product)
            } else {
                amount += product.quantity * product.product_id.price;
                await productFactory.updateProduct(product.product_id._id, {stock: product.product_id.stock-product.quantity})
            }
        })

        await cartFactory.updateAfterPurchase(cart_id, not_available_products)

        const newTicket = await createTicket(amount, purchaser)
        res.send(newTicket)
    } catch (error) {
        req.logger.error(`${error} - ${new Date().toLocaleString()}`)
        res.status(500).json({ message: error.message })
    }
}