import { Router } from 'express'
import { mongoProductManager } from '../index.js'

export const viewsRouter = Router()

viewsRouter.get('/products', async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await mongoProductManager.getProducts(limit)
        res.render('home', { products })
    } catch (error) {
        res.json(error.message)
    }
})

viewsRouter.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts', {})
})