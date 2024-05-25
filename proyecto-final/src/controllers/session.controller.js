import { MongoUserManager } from "../dao/mongoManagers/mongoUserManager.js";
import passport from "passport";

export const mongoUserManager = new MongoUserManager();

export const login = async (req, res) => {
    try {
        const user = await mongoUserManager.login(req.body)
        req.session.user = user
        res.redirect('http://localhost:8080/views/products')
        return
    } catch (error) {
        req.logger.error(`${error} - ${new Date().toLocaleString()}`)
        res.status(500).json(error)
    }
}

export const register = async (req, res) => {
    passport.authenticate("register", {
        failureRedirect: "/auth/register-failed",
    }),
        async (req, res) => {
            try {
                return res.status(200).redirect("/products");
            } catch (error) {
                req.logger.error(`${error} - ${new Date().toLocaleString()}`)
                return res.status(500).json(error);
            }
        }
}

export const logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            req.logger.error(`${err} - ${new Date().toLocaleString()}`)
            return res.status(500).json({ error: "Error al cerrar sesión" });
        } else {
            return res.status(200).redirect("/auth/login");
        }
    });
}

