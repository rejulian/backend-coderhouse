import { Router } from "express";
import { cartManager } from "../index.js";

const cartRouter = Router()

//GET CART PRODUCTS
cartRouter.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const products = await cartManager.getCartsProducts(cid)

        if(!products){
            return res.status(404).json({
                message: "Could not find any products"
            })
        }

        return res.status(200).json(products)
    } catch (error) {
        res.status(500).json({
            message: "Error while getting products from cart"
        })
    }
})

//NEW CART
cartRouter.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.newCart()
        return res.status(200).json(newCart)
    } catch (error) {
        res.status(500).json({
            message: "Error while creating new cart"
        })
    }
})

//ADD PRODUCT TO CART
cartRouter.post('/:cart_id/product/:product_id', async (req, res)=> {
    try {
        const {cart_id, product_id} = req.params;
        const response = await cartManager.addProductToCart(cart_id, product_id)

        if(!response){
            return res.status(404).json({
                message: "Could not add product to cart"
            })
        }

        return res.status(200).json({
            message: response
        })
    } catch (error) {
        res.status(500).json({
            message: "Error while adding product to cart"
        })
    }
})

export { cartRouter }