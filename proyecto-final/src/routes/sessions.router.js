import { Router } from "express";
import passport from "passport";
import { login, logout, register } from "../controllers/session.controller.js";

export const sessionRouter = Router()


sessionRouter.post('/login', login)

sessionRouter.post("/register", register);

sessionRouter.get(
    "/github",
    passport.authenticate("github", { scope: ['user:email'] }),
    async (req, res) => { }
);

sessionRouter.get(
    "/callbackGithub",
    passport.authenticate("github", {}),
    async (req, res) => {
        req.session.user = req.user;
        return res.status(200).redirect("/views/products");
    }
);

sessionRouter.get("/logout", logout);



// sessionRouter.post('/register', async (req, res) => {
//     try {
//         const new_user = await mongoUserManager.register(req.body)
//         res.redirect('http://localhost:8080/views/login')
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

// sessionRouter.post('/login', async (req, res) => {
//     try {
//         const user = await mongoUserManager.login(req.body)
//         req.session.user = user
//         res.redirect('http://localhost:8080/views/products')
//         return
//     } catch (error) {
//         console.log(error.message)
//         res.status(500).json({ message: error.message })
//     }
// })
