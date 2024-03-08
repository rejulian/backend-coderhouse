import { Router } from "express";
import { MongoUserManager } from "../dao/mongoManagers/mongoUserManager.js";


export const sessionRouter = Router()
export const mongoUserManager = new MongoUserManager();

sessionRouter.post('/register', async (req,res)=> {
    try {
        const new_user = await mongoUserManager.register(req.body)
        res.json(new_user)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

sessionRouter.post('/login', async (req,res)=> {
    try {
        const user = await mongoUserManager.login(req.body)
        req.session.user = user
        res.send("Login successful!")
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
