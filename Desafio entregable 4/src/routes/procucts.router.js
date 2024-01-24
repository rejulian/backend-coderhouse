import { Router } from 'express'
import { productManager } from '../index.js'

const productRouter = Router()

//GET ALL PRODUCTS
productRouter.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts()

        if (limit) {
            const productsLimit = products.slice(0, limit)
            return res.status(200).json(productsLimit)
        }

        return res.status(200).json(products)
        //🔴🔴🔴🔴RENDERIZAR EN HOME.HANDLEBARS

    } catch (error) {
        res.status(500).json({
            message: 'Error while getting products'
        })
    }
})

//GET PRODUCT BY ID
productRouter.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productManager.getProductById(pid)

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }

        return res.status(200).json(product)

    } catch (error) {
        res.status(500).json({
            message: 'Error while getting product'
        })
    }
})

//ADD PRODUCT
productRouter.post('/', async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock, status = true, category } = req.body;
        if (!title || !description || !price || !thumbnail || !code || !stock || !category) {
            return res.status(400).json({
                message: 'Error while adding product. Fill the gaps'
            })
        }
        const product = await productManager.addProduct({ title, description, price, thumbnail, code, stock, status, category })
        return res.status(200).json(product)

    } catch (error) {
        res.status(500).json({
            message: 'Error while adding product'
        })
        console.log(error);
    }
})

//UPDATE PRODUCT
productRouter.put('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const { title, description, price, thumbnail, code, stock, status = true, category } = req.body;

        const updatedProduct = await productManager.updateProduct(pid, { title, description, price, thumbnail, code, stock, status, category })

        if (!updatedProduct) {
            return res.status(404).json({
                message: 'Could not update product'
            })
        }

        return res.status(200).json(updatedProduct)

    } catch (error) {
        res.status(500).json({
            message: 'Error while updating product'
        })
    }
})

//DELETE PRODUCT
productRouter.delete('/:pid', async (req, res) => {
    try {
        const {pid} = req.params;
        const response =  await productManager.deleteProductById(pid)

        if(!response){
            return res.status(404).json({
                message: 'Could not delete product'
            })
        }

        return res.status(200).json({
            message : response
        })

    } catch (error) {
        res.status(500).json({
            message: 'Error while deleting product'
        })
    }
})

export { productRouter }
