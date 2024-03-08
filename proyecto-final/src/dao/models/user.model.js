import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        enum:['admin', 'usuario']
    }
})

export const UserModel = mongoose.model('User', UserSchema)