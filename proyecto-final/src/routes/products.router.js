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
        console.log(error);
    }

})

//VER PRODUCTO POR ID
productsRouter.get('/:pid', async (req, res) => {
    try {
        const id = req.params.pid;
        const response = await productManager.getProductById(id)
        res.json(response)
    } catch (error) {
        console.log(error);
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
        console.log(error);
    }
})

//ACTUALIZAR PRODUCTO
productsRouter.put('/:pid', async (req, res) => {
    try {
        const id = req.params.pid;
        const { title, description, price, thumbnail, code, stock, status = true, category } = req.body;
        const response = await productManager.updateProduct(id, { title, description, price, thumbnail, code, stock, status, category })
        res.json(response)
    } catch (error) {
        console.log(error);
        res.send('ERROR')
    }
})

//ELIMINAR PRODUCTO
productsRouter.delete('/:pid', async (req, res) => {
    try {
        const id = req.params.pid;
        await productManager.deleteProduct(id)
        res.send('Producto eliminado exitosamente')
    } catch (error) {
        console.log(error);
    }
})

export { productsRouter }