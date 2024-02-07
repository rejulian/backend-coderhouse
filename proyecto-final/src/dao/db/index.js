import mongoose from "mongoose";
import 'dotenv/config'

export const databaseConnection = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log('Connected to database'))
    .catch(err=>console.log('Error connecting to database', err))
}