import { MongoUserManager } from "../dao/mongoManagers/mongoUserManager.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import { transporter } from "../config/nodemailer.js";
import { hashPassword } from "../services/bcrypt.js"
import { UserDTO } from "../dto/user.dto.js";

export const mongoUserManager = new MongoUserManager();

export const login = async (req, res) => {
    try {
        const user = await mongoUserManager.login(req.body);
        req.session.user = user;
        res.redirect('http://localhost:8080/views/products');
    } catch (error) {
        req.logger.error(`${error} - ${new Date().toLocaleString()}`);
        res.status(500).json(error);
    }
};

export const register = (req, res, next) => {
    passport.authenticate("register", (err, user, info) => {
        if (err) {
            req.logger.error(`${err} - ${new Date().toLocaleString()}`);
            return res.status(500).json({ error: err.message });
        }
        if (!user) {
            return res.redirect('/auth/register-failed');
        }
        req.login(user, (loginErr) => {
            if (loginErr) {
                req.logger.error(`${loginErr} - ${new Date().toLocaleString()}`);
                return res.status(500).json({ error: loginErr.message });
            }
            return res.status(200).json(user)
        });
    })(req, res, next);
};

export const logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            req.logger.error(`${err} - ${new Date().toLocaleString()}`);
            return res.status(500).json({ error: "Error al cerrar sesión" });
        } else {
            return res.status(200).redirect("/auth/login");
        }
    });
};

export const getCurrentUser = async (req, res) => {
    const userDTO = new UserDTO(req.session.user)
    res.json(userDTO);
}

export const recoverPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await mongoUserManager.findOne({ email });
        if (!user) {
            return res.status(404).send("Usuario no encontrado");
        }

        const token = jwt.sign({ userId: user._id }, "secretKey", {
            expiresIn: "1h",
        });

        const resetLink = `http://localhost:8080/views/resetPassword?token=${token}`;

        await transporter.sendMail({
            to: email,
            subject: "Recuperación de Contraseña",
            html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p><p><a href="${resetLink}">Restablecer Contraseña</a></p>`,
        });

        res.send(`Correo de restablecimiento enviado`);
    } catch (error) {
        console.error("Error al enviar el correo de restablecimiento:", error);
        res.status(500).send("Error al enviar el correo de restablecimiento");
    }
};

export const resetPassword = async (req, res) => {
    const { token, password } = req.body;

    try {
        console.log("Token recibido:", token);

        const decoded = jwt.verify(token, "secretKey");
        console.log("Token decodificado:", decoded);

        const user = await mongoUserManager.findById(decoded.userId);

        if (!user) {
            return res.status(404).send("Usuario no encontrado");
        }

        console.log("Usuario encontrado para restablecer contraseña:", user); //verificar el usuario encontrado

        console.log(user.password, password);

        const isSamePassword = await mongoUserManager.compareOldPassword(
            password,
            user.password
        );

        if (isSamePassword) {
            return res
                .status(400)
                .send("La nueva contraseña no puede ser la misma que la anterior");
        }

        user.password = await hashPassword(password);
        console.log(`nueva contra: ${user.password}`);

        await user.save();
        res.send("Contraseña restablecida con éxito");

        console.log(token);
    } catch (error) {
        console.log(error)
        res.status(400).send("Token inválido o expirado");
    }
};

export const changeRole = async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await mongoUserManager.findById(uid);
        if(!user) throw new Error("Usuario no encontrado")
        
        user.role = user.role === "premium" ? "user" : "premium"

        await user.save()
        res.send("Rol de usuario cambiado exitosamente")
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}