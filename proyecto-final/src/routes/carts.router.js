import { Router } from "express";
import { addProductToCart, createCart, deleteAllProductsFromCart, deleteProductFromCart, getCartProducts, updateProductQuantityFromCart } from "../controllers/cart.controller.js";

const cartsRouter = Router()

cartsRouter.post('/', createCart)

cartsRouter.get('/:cid', getCartProducts)

cartsRouter.post('/:cid/product/:pid', addProductToCart)

cartsRouter.delete('/:cid/product/:pid', deleteProductFromCart)

cartsRouter.delete('/:cid', deleteAllProductsFromCart)

cartsRouter.put('/:cid/product/:pid', updateProductQuantityFromCart)

export { cartsRouter }