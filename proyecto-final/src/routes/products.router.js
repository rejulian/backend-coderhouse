import { Router } from "express";
import { productManager } from "../index.js";


const productsRouter = Router()

//VER TODOS LOS PRODUCTOS
productsRouter.get('/', async (req, res) => {
    const {limit} = req.query;
    const response = await productManager.getProducts()

    if(limit) {
        const limitedProducts = response.slice(0, limit)
        return res.json(limitedProducts)
    }

    return res.json(response)

})

//VER PRODUCTO POR ID
productsRouter.get('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);
    const response = await productManager.getProductById(id)
    res.json(response)
})

//AGREGAR PRODUCTO
productsRouter.post('/', async (req, res) => {
    const {title, description, price, thumbnail, code, stock, status = true, category} = req.body;
    const response = await productManager.addProduct({title, description, price, thumbnail, code, stock, status, category})
    res.json(response)
})

//ACTUALIZAR PRODUCTO
productsRouter.put('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);
    const {title, description, price, thumbnail, code, stock, status = true, category} = req.body;
    const response = await productManager.updateProduct(id, {title, description, price, thumbnail, code, stock, status, category})
    res.json(response)
})

//ELIMINAR PRODUCTO
productsRouter.delete('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);
    await productManager.deleteProduct(id)
    res.send('Producto eliminado exitosamente')
})

export {productsRouter}