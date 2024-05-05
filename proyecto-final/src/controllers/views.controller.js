import { MongoMessageManager } from '../dao/mongoManagers/mongoMessageManager.js';
import { mongoProductManager } from '../index.js'
import { io } from '../index.js'
import { mongoCartManager } from '../controllers/cart.controller.js';

const mongoMessageManager = new MongoMessageManager()

export const viewAllProducts = async (req, res) => {
    try {
        const { limit = 10, page = 1, query, sort = -1 } = req.query;
        const products = await mongoProductManager.getProducts(limit, page, query, sort)
        res.render('home', { products: products.payload, first_name: req.session.user.first_name })
    } catch (error) {
        res.json(error.message)
    }
}

export const viewRealTimeProducts = async (req, res) => {
    try {
        const { limit = 10, page = 1, query, sort = 1 } = req.query;
        const products = await mongoProductManager.getProducts(limit, page, query, sort)
        res.render('realTimeProducts', { products })
    } catch (error) {
        res.json(error.message)
    }
}

export const viewProductsOfCart = async (req, res) => {
    try {
        const { id } = req.params
        const products = await mongoCartManager.getCartProducts(id)
        res.render('cart', { products })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const viewLogin = async (req, res) => {
    try {
        res.render('login')
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const viewRegister = async (req, res) => {
    try {
        res.render('register')
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const viewChat = async (req, res) => {
    try {
        const messages = await mongoMessageManager.getMessages()
        res.render('chat', { messages: messages })
    } catch (error) {
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
        return res.status(500).json({ message: error.message })
    }
}