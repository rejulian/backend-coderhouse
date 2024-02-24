import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    stock: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
})

ProductSchema.plugin(mongoosePaginate)

export const ProductModel = mongoose.model('Product', ProductSchema)