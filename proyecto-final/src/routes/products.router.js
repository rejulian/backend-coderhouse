import { Router } from "express";
import { productManager } from "../index.js";


const productsRouter = Router()

//VER TODOS LOS PRODUCTOS
productsRouter.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        const response = await productManager.getProducts()

        if (limit) {
            const limitedProducts = response.slice(0, limit)
            return res.json(limitedProducts)
        }

        return res.json(response)
    } catch (error) {
        res.status(500).json({
            message: 'Error al buscar productos'
        })
    }

})

//VER PRODUCTO POR ID
productsRouter.get('/:pid', async (req, res) => {
    try {
        const id = req.params.pid;
        const response = await productManager.getProductById(id)

        if(!response){
            res.status(404).json({
                message: 'Product not found'
            })
        }

        res.json(response)
    } catch (error) {
        res.status(500).json({
            message: 'Error al buscar producto'
        })
    }
})

//AGREGAR PRODUCTO
productsRouter.post('/', async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock, status = true, category } = req.body;
        if(!title || !description || !price || !thumbnail || !code || !stock || !category){
            res.status(400).send('Error al intentar guardar producto. Envie todos los campos necesarios')
        } else{
            const response = await productManager.addProduct({ title, description, price, thumbnail, code, stock, status, category })
            res.json(response)
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al intentar guardar producto.'
        })

    }
})

//ACTUALIZAR PRODUCTO
productsRouter.put('/:pid', async (req, res) => {
    try {
        const id = req.params.pid;
        const { title, description, price, thumbnail, code, stock, status = true, category } = req.body;
        const response = await productManager.updateProduct(id, { title, description, price, thumbnail, code, stock, status, category })

        if(!response){
            res.status(404).json({
                message: 'Could not update product'
            })
        }

        res.json(response)
    } catch (error) {
        res.status(500).json({
            message: 'Error al intentar actualizar producto.'
        })
    }
})

//ELIMINAR PRODUCTO
productsRouter.delete('/:pid', async (req, res) => {
    try {
        const id = req.params.pid;
        await productManager.deleteProduct(id)
        res.status(200).json({
            meesage: 'Producto eliminado exitosamente'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error al intentar eliminar producto.'
        })
    }
})

export { productsRouter }