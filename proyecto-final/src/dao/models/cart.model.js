import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    products: {
        type: [{
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }],
        default: []
    }
})

export const CartModel = mongoose.model('Cart', CartSchema)