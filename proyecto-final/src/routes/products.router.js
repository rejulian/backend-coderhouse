import { Router } from "express";
import { adminMiddleware } from "../middlewares/auth.middleware.js";
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/product.controller.js";

const productsRouter = Router()

//VER TODOS LOS PRODUCTOS
productsRouter.get('/', getAllProducts)

//VER PRODUCTO POR ID
productsRouter.get('/:pid', getProductById)

//AGREGAR PRODUCTO
productsRouter.post('/', adminMiddleware, addProduct)

//ACTUALIZAR PRODUCTO
productsRouter.put('/:pid', adminMiddleware, updateProduct)

//ELIMINAR PRODUCTO
productsRouter.delete('/:pid', adminMiddleware, deleteProduct)

export { productsRouter }