import { Router } from 'express'
import { productManager } from '../index.js'

export const viewsRouter = Router()

viewsRouter.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts()

        if (limit) {
            const productsLimit = products.slice(0, limit);
            return res.status(200).render("home", { products: productsLimit });
        }

        return res.status(200).render("home", { products });
    } catch (error) {
        res.status(500).json({
            message: 'Error while getting products'
        });
    }
});

viewsRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts',{})
})