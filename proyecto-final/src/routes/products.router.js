import { Router } from "express";
import { adminMiddleware, authMiddleware, authorizationMiddleware } from "../middlewares/auth.middleware.js";
import { addProduct, deleteProduct, getAllProducts, getMockProducts, getProductById, updateProduct } from "../controllers/product.controller.js";

const productsRouter = Router()

//VER TODOS LOS PRODUCTOS
productsRouter.get('/', getAllProducts)

// OBTENER MOCK DE PRODCUTOS
productsRouter.get('/mockingproducts', getMockProducts)

//VER PRODUCTO POR ID
productsRouter.get('/:pid', getProductById)

//AGREGAR PRODUCTO
productsRouter.post('/', authorizationMiddleware, addProduct)

//ACTUALIZAR PRODUCTO
productsRouter.put('/:pid', adminMiddleware, updateProduct)

//ELIMINAR PRODUCTO
productsRouter.delete('/:pid', authorizationMiddleware, deleteProduct)

export { productsRouter }