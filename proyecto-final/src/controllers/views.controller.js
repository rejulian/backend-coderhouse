import { MongoMessageManager } from '../dao/mongoManagers/mongoMessageManager.js';
import { Products } from "../dao/factory.js";
import { cartFactory } from '../controllers/cart.controller.js';
import { io } from '../index.js'
import { UserDTO } from "../dto/user.dto.js";
// import { mongoCartManager } from '../controllers/cart.controller.js';

const mongoMessageManager = new MongoMessageManager()
const productFactory = new Products()

export const viewAllProducts = async (req, res) => {
    try {
        const { limit = 10, page = 1, query, sort = -1 } = req.query;
        const products = await productFactory.getProducts(limit, page, query, sort)
        let data = {
            products: products.payload || products,
            first_name: req.session.user.first_name,
            cart_id: req.session.user.cart_id
        }
        res.render('home', data)
    } catch (error) {
        req.logger.error(`${error} - ${new Date().toLocaleString()}`)
        res.json(error.message)
    }
}

export const viewRealTimeProducts = async (req, res) => {
    try {
        const { limit = 10, page = 1, query, sort = 1 } = req.query;
        const products = await productFactory.getProducts(limit, page, query, sort)
        res.render('realTimeProducts', { products })
    } catch (error) {
        req.logger.error(`${error} - ${new Date().toLocaleString()}`)
        res.json(error.message)
    }
}

export const viewProductsOfCart = async (req, res) => {
    try {
        const { id } = req.params
        const products = await cartFactory.getCartProducts(id)
        res.render('cart', { products })
    } catch (error) {
        req.logger.error(`${error} - ${new Date().toLocaleString()}`)
        return res.status(500).json({ message: error.message })
    }
}

export const viewLogin = async (req, res) => {
    try {
        res.render('login')
    } catch (error) {
        req.logger.error(`${error} - ${new Date().toLocaleString()}`)
        return res.status(500).json({ message: error.message })
    }
}

export const viewRegister = async (req, res) => {
    try {
        res.render('register')
    } catch (error) {
        req.logger.error(`${error} - ${new Date().toLocaleString()}`)
        return res.status(500).json({ message: error.message })
    }
}

export const viewChat = async (req, res) => {
    try {
        const messages = await mongoMessageManager.getMessages()
        res.render('chat', { messages: messages })
    } catch (error) {
        req.logger.error(`${error} - ${new Date().toLocaleString()}`)
        return res.status(500).json({ message: error.message })
    }
}

export const createMessage = async (req, res) => {
    try {
        const { user, message } = req.body;
        const newMessage = await mongoMessageManager.addMessage(user, message)
        io.emit('message', newMessage)
        return res.json(newMessage)
    } catch (error) {
        req.logger.error(`${error} - ${new Date().toLocaleString()}`)
        return res.status(500).json({ message: error.message })
    }
}

export const getCurrentUser = async (req, res) => {
    const userDTO = new UserDTO(req.session.user)
    res.render("current", { user: userDTO });
}