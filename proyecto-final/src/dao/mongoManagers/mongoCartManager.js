import { CartModel } from "../models/cart.model.js"

export class MongoCartManager {

    createCart = async () => {
        try {
            const newCart = await CartModel.create({products: []});
            return newCart
        } catch (error) {
            throw new Error(error.message)
        }
    }

    getCartProducts = async (id) => {
        try {
            const products = await CartModel.findOne({ _id: id }).select('products')
            if(!products) throw new Error('Could not get any products')
            return products.products
        } catch (error) {
            throw new Error(error.message)
        }
    }

    addProductToCart = async (cart_id, product_id, quantity = 10) => {
        try {
            const existingCart = await CartModel.findById(cart_id)
            if(!existingCart) throw new Error('Could not find cart')

            const newProduct = { product_id: product_id, quantity}
            existingCart.products.push(newProduct)

            await existingCart.save()
            return existingCart
        } catch (error) {
            throw new Error(error.message)
        }
    }

    deleteProductFromCart = async (cart_id, product_id) => {
        try {
            const existingCart = await CartModel.findById(cart_id)
            if(!existingCart) throw new Error('Could not find cart')
            
            existingCart.products = existingCart.products.filter(p => p.id !== product_id)
            await existingCart.save()
            return existingCart
        } catch (error) {
            throw new Error(error.message)
        }
    }

    deleteProductsFromCart = async (cart_id) => {
        try {
            const existingCart = await CartModel.findById(cart_id)
            if(!existingCart) throw new Error('Could not find cart')

            existingCart.products = []
            await existingCart.save()
            return existingCart
        } catch (error) {
            throw new Error(error.message)
        }
    }
}