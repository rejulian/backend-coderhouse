import { Router } from "express";
import { MongoUserManager } from "../dao/mongoManagers/mongoUserManager.js";


export const sessionRouter = Router()
export const mongoUserManager = new MongoUserManager();

sessionRouter.post('/register', async (req,res)=> {
    try {
        const new_user = await mongoUserManager.register(req.body)
        res.redirect('/views/login')
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

sessionRouter.post('/login', async (req,res)=> {
    try {
        const user = await mongoUserManager.login(req.body)
        req.session.user = user
        res.redirect('/views/products')
        return
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})
