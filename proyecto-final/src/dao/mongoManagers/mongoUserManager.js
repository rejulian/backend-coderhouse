import { comparePassword, hashPassword } from "../../services/bcrypt.js";
import { CustomError } from "../../services/errors/CustomError.js";
import { EErrors } from "../../services/errors/enum.errors.js";
import { generateLoginError, generateRegistrationError, generateUserExistsError } from "../../services/errors/messages/user.errors.causes.js";
import { UserModel } from "../models/user.model.js"
import { MongoCartManager } from "./mongoCartManager.js";

const cartManager = new MongoCartManager();

export class MongoUserManager {

    register = async (user) => {
        try {
            const { first_name, last_name, email, age, password, role = 'usuario' } = user;
            if (!first_name || !last_name, !email || !password, !age) {
                CustomError.createError({
                    name: "User registration error",
                    cause: generateRegistrationError({ first_name, last_name, email, age, password }),
                    message: "Registration failed",
                    code: EErrors.INVALID_TYPES_ERROR
                })
            }
            const exists = await UserModel.findOne({ email })
            if (exists) {
                CustomError.createError({
                    name: "User registration error",
                    cause: generateUserExistsError({ email }),
                    message: "Registration failed",
                    code: EErrors.ALREADY_EXISTS_ERROR
                })
            }
            const hashedPassword = await hashPassword(password)
            const newCart = await cartManager.createCart()
            const new_user = await UserModel.create({ first_name, last_name, email, age, password: hashedPassword, role, cart_id: newCart._id })
            return new_user
        } catch (error) {
            throw error
        }
    }

    login = async (user) => {
        try {
            const { email, password } = user;
            const existingUser = await UserModel.findOne({ email })
            if (!existingUser) {
                CustomError.createError({
                    name: "User login error",
                    cause: generateLoginError({ email, password }),
                    message: "Login failed",
                    code: EErrors.CREDENTIALS_ERROR
                })
            }
            const passwordMatches = await comparePassword(password, existingUser.password)
            if (!passwordMatches) {
                CustomError.createError({
                    name: "User login error",
                    cause: generateLoginError({ email, password }),
                    message: "Login failed",
                    code: EErrors.CREDENTIALS_ERROR
                })
            }

            const userData = {
                first_name: existingUser.first_name,
                last_name: existingUser.last_name,
                email: existingUser.email,
                age: existingUser.age,
                role: existingUser.role,
                cart_id: existingUser.cart_id,
            }

            return userData
        } catch (error) {
            throw error
        }
    }

    getUserById = async (id) => {
        try {
            const user = await UserModel.findById(id)
            if (!user) {
                CustomError.createError({
                    name: "User error",
                    cause: generateNotFoundError({ id, email }),
                    message: "Find user failed",
                    code: EErrors.NOT_FOUND_ERROR
                })
            }
            return user
        } catch (error) {
            throw error
        }
    }

    findUserByEmail = async (email) => {
        try {
            const user = UserModel.findOne({ email })
            if (!user) {
                CustomError.createError({
                    name: "User error",
                    cause: generateNotFoundError({ id, email }),
                    message: "Find user failed",
                    code: EErrors.NOT_FOUND_ERROR
                })
            }
            return user
        } catch (error) {
            throw error
        }
    }
}