import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    products: {
        type: [],
        default: []
    }
})

export const CartModel = mongoose.model('Cart', CartSchema)