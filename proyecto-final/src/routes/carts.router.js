import { Router } from "express";
import { cartManager } from "../index.js"


const cartsRouter = Router()

cartsRouter.post('/', async (req, res) => {
    try {
        const response = await cartManager.newCart()
        res.json(response)
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear carrito'
        })
    }
})

cartsRouter.get('/:cid', async (req, res) => {
    const { cid } = req.params;

    try {
        const response = await cartManager.getCartProducts(cid)

        if(!response){
            res.status(404).json({
                message: `Could not find products of car with id ${cid}`
            })
        }

      res.json(response)
    } catch (error) {
        res.status(500).json({
            message: 'Error al buscar carrito'
        })
    }
})

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;

    try {
        await cartManager.addProductToCart(cid, pid)
        res.send('Producto agregado exitosamente')
    } catch (error) {
        res.status(500).json({
            message: "ERROR AL INTENTAR GUARDAR PRODUCTO AL CARRITO"
        })
    }
})

export { cartsRouter }