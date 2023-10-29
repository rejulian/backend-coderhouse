import express from 'express';
import { ProductManager } from './productManager3.js';

const productsManager = new ProductManager()

const PORT = 8080;

const app = express();

app.get('/products', async (req, res) => {

    const limit = req.query.limit

    if (limit) {
        const products = await productsManager.getProducts()
        const limitedProducts = products.slice(0,limit)
        res.json(limitedProducts)
    } else {
        res.json({
            products: await productsManager.getProducts()
        })
    }

})

app.get('/products/:pid', async (req, res) => {
    const id = parseInt(req.params.pid)
    const producto = await productsManager.getProductById(id)
    if (producto) {
        res.json(producto)
    } else {
        res.json({error: `Product with id ${id} was not found`})
    }
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})
