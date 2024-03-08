import { UserModel } from "../models/user.model.js"

export class MongoUserManager {

    register = async (user) => {
        try {
            const { first_name, last_name, email, age, password, role = 'usuario' } = user;
            if (!first_name || !last_name, !email || !password, !age) throw new Error("Complete the required fields!")
            const exists = await UserModel.findOne({ email })
            if (exists) throw new Error("User already exists")
            const new_user = await UserModel.create({ first_name, last_name, email, age, password, role })
            return new_user
        } catch (error) {
            throw new Error(error.message)
        }
    }

    login = async (user) => {
        try {
            const { email, password } = user;
            const exitingUser = await UserModel.findOne({ email })
            if (!exitingUser || exitingUser.password !== password) throw new Error("Invalid credentials!")

            const userData = {
                first_name: exitingUser.first_name,
                last_name: exitingUser.last_name,
                email: exitingUser.email,
                age: exitingUser.age
            }

            return userData
        } catch (error) {
            throw new Error(error.message)
        }
    }
}