import { ProductModel } from "../models/product.model.js"

export class MongoProductManager {

    addProduct = async (product) => {
        try {
            const { title, description, price, thumbnail, code, stock, status=true, category } = product;
            if(!title || !description || !price || !thumbnail || !code || !stock || !status || !category) throw new Error('Complete all the required fields')
            const newProduct = await ProductModel.create(product)
            return newProduct
        } catch (error) {
            throw new Error(error.message)
        }
    }

    getProducts = async (limit) => {
        try {
            if (limit) {
                const limitedProducts = await ProductModel.find().limit(limit)
                if (limitedProducts.length === 0) throw new Error("Could not find any products")
                return limitedProducts
            }
            const products = await ProductModel.find()
            if (products.length === 0) throw new Error("Could not find any products")
            return products
        } catch (error) {
            throw new Error(error.message)
        }
    }

    getProductById = async (id) => {
        try {
            const product = await ProductModel.findById(id)
            if (!product) throw new Error('Product not found')
            return product;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    updateProduct = async (id, product) => {
        try {
            const { title, description, price, thumbnail, code, stock, status=true, category } = product;
    
            const existingProduct = await ProductModel.findById(id);
            if (!existingProduct) throw new Error('Product not found');
    
            if (title) existingProduct.title = title;
            if (description) existingProduct.description = description;
            if (price) existingProduct.price = price;
            if (thumbnail) existingProduct.thumbnail = thumbnail;
            if (code) existingProduct.code = code;
            if (stock) existingProduct.stock = stock;
            if (status !== undefined) existingProduct.status = status;
            if (category) existingProduct.category = category;
    
            const updatedProduct = await existingProduct.save();
            return updatedProduct;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    

    deleteProduct = async (id) => {
        try {
            const product = await ProductModel.findByIdAndDelete(id)
            if (!product) throw new Error('Product not found')
            return 'Product deleted successfully'
        } catch (error) {
            throw new Error(error.message)
        }
    }
}