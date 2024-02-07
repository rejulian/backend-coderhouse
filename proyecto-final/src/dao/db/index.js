import mongoose from "mongoose";

export const databaseConnection = () => {
    mongoose.connect('mongodb+srv://rejulian:EC4Nf7hzo6wxjKIa@proyectocoder.fo07ay6.mongodb.net/ecommerce')
    .then(()=>console.log('Connected to database'))
    .catch(err=>console.log('Error connecting to database', err))
}