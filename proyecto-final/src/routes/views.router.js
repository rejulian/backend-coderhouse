import { Router } from 'express'
import { MongoMessageManager } from '../dao/mongoManagers/mongoMessageManager.js';
import { mongoProductManager } from '../index.js'
import { io } from '../index.js'

export const viewsRouter = Router()
const mongoMessageManager = new MongoMessageManager

viewsRouter.get('/products', async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await mongoProductManager.getProducts(limit)
        res.render('home', { products })
    } catch (error) {
        res.json(error.message)
    }
})

viewsRouter.get('/realTimeProducts', async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await mongoProductManager.getProducts(limit)
        res.render('realTimeProducts', { products })
    } catch (error) {
        res.json(error.message)
    }
})

viewsRouter.get('/chat', async (req, res) => {
    try {
        const messages = await mongoMessageManager.getMessages()
        res.render('chat', { messages: messages })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

viewsRouter.post('/chat', async (req, res) => {
    try {
        const { user, message } = req.body;
        const newMessage = await mongoMessageManager.addMessage(user, message)
        io.emit('message', newMessage)
        return res.json(newMessage)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})