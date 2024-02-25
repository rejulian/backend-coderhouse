import { CartModel } from "../models/cart.model.js"
import mongoose from "mongoose";

export class MongoCartManager {

    createCart = async () => {
        try {
            const newCart = await CartModel.create({ products: [] });
            return newCart
        } catch (error) {
            throw new Error(error.message)
        }
    }

    getCartProducts = async (id) => {
        try {
            const products = await CartModel.findOne({ _id: id }).select('products').populate('products.product_id')
            if (!products) throw new Error('Could not get any products')
            return products.products
        } catch (error) {
            throw new Error(error.message)
        }
    }

    addProductToCart = async (cart_id, product_id, quantity = 10) => {
        try {
            const existingCart = await CartModel.findById(cart_id)
            if (!existingCart) throw new Error('Could not find cart')

            const newProduct = { product_id: product_id, quantity }
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
            if (!existingCart) throw new Error('Could not find cart')

            const productIdToDelete = new mongoose.Types.ObjectId(product_id);

            existingCart.products = existingCart.products.filter(p => p.product_id._id.toString() !== productIdToDelete.toString())
            await existingCart.save()
            return existingCart
        } catch (error) {
            throw new Error(error.message)
        }
    }

    deleteProductsFromCart = async (cart_id) => {
        try {
            const existingCart = await CartModel.findById(cart_id)
            if (!existingCart) throw new Error('Could not find cart')

            existingCart.products = []
            await existingCart.save()
            return existingCart
        } catch (error) {
            throw new Error(error.message)
        }
    }

    updateQuantity = async (cart_id, product_id, quantity) => {
        try {
            const existingCart = await CartModel.findById(cart_id)
            if (!existingCart) throw new Error('Could not find cart')

            const productIdToUpdate = new mongoose.Types.ObjectId(product_id);


            const index = existingCart.products.findIndex(p => p.product_id._id.toString() === productIdToUpdate.toString())
            existingCart.products[index].quantity = quantity;

            existingCart.save()
            return existingCart
        } catch (error) {
            console.log(error);
            throw new Error(error.message)
        }
    }
}