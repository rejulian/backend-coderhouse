import { Router } from "express";
import { MongoUserManager } from "../dao/mongoManagers/mongoUserManager.js";
import passport from "passport";

export const sessionRouter = Router()
export const mongoUserManager = new MongoUserManager();


sessionRouter.post('/login', async (req, res) => {
    try {
        const user = await mongoUserManager.login(req.body)
        req.session.user = user
        res.redirect('http://localhost:8080/views/products')
        return
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})

sessionRouter.post(
    "/register",
    passport.authenticate("register", {
        failureRedirect: "/auth/register-failed",
    }),
    async (req, res) => {
        try {
            return res.status(200).redirect("/products");
        } catch (error) {
            return res.status(500).json(error);
        }
    }
);

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

sessionRouter.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error al cerrar sesión:", err);
            return res.status(500).json({ error: "Error al cerrar sesión" });
        } else {
            return res.status(200).redirect("/auth/login");
        }
    });
});



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
