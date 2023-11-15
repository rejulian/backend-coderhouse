import { Router } from "express";
import { productManager } from "../index.js";

const viewsRouter = Router()

viewsRouter.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts()

        res.status(200).render('home',{
            title: 'Products | Handlerbars',
            products
        })
    } catch (error) {
        res.status(500).json({
            message: "Couldn't get products"
        })
    }
})

export { viewsRouter }
