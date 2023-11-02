import { Router } from "express";

const cartsRouter = Router()

cartsRouter.get('/', (req, res) => {
    res.send('carrito')
})

export {cartsRouter}