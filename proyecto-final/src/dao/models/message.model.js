import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    message: {
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:new Date
    }
})

export const MessageModel = mongoose.model('Message', MessageSchema)