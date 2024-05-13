import { Router } from 'express'
import { authMiddleware, userLogged } from '../middlewares/auth.middleware.js';
import { createMessage, getCurrentUser, viewAllProducts, viewChat, viewLogin, viewProductsOfCart, viewRealTimeProducts, viewRegister } from '../controllers/views.controller.js';


export const viewsRouter = Router()

// TODOS LOS PRODUCTOS
viewsRouter.get('/products', authMiddleware, viewAllProducts)

// PRODUCTOS EN TIEMPO REAL
viewsRouter.get('/realTimeProducts', authMiddleware, viewRealTimeProducts)

// PRODUCTOS DE UN CARRITO
viewsRouter.get('/cart/:id', viewProductsOfCart)

// LOGIN
viewsRouter.get('/login', userLogged, viewLogin)

// REGISTER
viewsRouter.get('/register', userLogged, viewRegister)

// current
viewsRouter.get("/current", authMiddleware ,getCurrentUser)

viewsRouter.get('/chat', viewChat)

viewsRouter.post('/chat', createMessage)

