import { Router } from "express";

const productsRouter = Router()

const products = ['manzana', 'pera', 'zanahoria']

//VER TODOS LOS PRODUCTOS
productsRouter.get('/', (req, res) => {
    const {limit} = req.query;
    if (limit) {
        const limitedProducts = products.slice(0, limit);
        return res.json(limitedProducts)
    }
    return res.json(products)
})

//VER PRODUCTO POR ID
productsRouter.get('/:pid', (req, res) => {
    const id = req.params.pid;
    res.json(products[id])
})

//AGREGAR PRODUCTO
productsRouter.post('/', (req, res) => {
    const {product} = req.body;
    products.push(product)
    res.send('producto agregado')
})

//ACTUALIZAR PRODUCTO
productsRouter.put('/:pid', (req, res) => {
})

//ELIMINAR PRODUCTO
productsRouter.delete('/:pid', (req, res) => {
})

export {productsRouter}