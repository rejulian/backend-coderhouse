import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    products: {
        type: [],
        default: []
    }
})

export const CartModel = new mongoose.model('Cart', CartSchema)