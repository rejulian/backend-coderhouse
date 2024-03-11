import { comparePassword, hashPassword } from "../../services/bcrypt.js";
import { UserModel } from "../models/user.model.js"

export class MongoUserManager {

    register = async (user) => {
        try {
            const { first_name, last_name, email, age, password, role = 'usuario' } = user;
            if (!first_name || !last_name, !email || !password, !age) throw new Error("Complete the required fields!")
            const exists = await UserModel.findOne({ email })
            if (exists) throw new Error("User already exists")
            const hashedPassword = await hashPassword(password)
            const new_user = await UserModel.create({ first_name, last_name, email, age, password:hashedPassword, role })
            return new_user
        } catch (error) {
            throw new Error(error.message)
        }
    }

    login = async (user) => {
        try {
            const { email, password } = user;
            const existingUser = await UserModel.findOne({ email })
            if (!existingUser) throw new Error("Invalid email!")
            const passwordMatches = await comparePassword(password, existingUser.password)
            if (!passwordMatches) throw new Error("Invalid credentials!")

            const userData = {
                first_name: existingUser.first_name,
                last_name: existingUser.last_name,
                email: existingUser.email,
                age: existingUser.age,
                role: existingUser.role
            }

            return userData
        } catch (error) {
            throw new Error(error.message)
        }
    }
}