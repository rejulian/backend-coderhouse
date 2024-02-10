import { MessageModel } from "../models/message.model.js";

export class MongoMessageManager {

    addMessage = async (user, message) => {
        try {
            if (!user, !message) throw new Error("Complete all the required fields");

            const newMessage = MessageModel.create({ user, message });
            return newMessage;
        } catch (error) {
            throw new Error("Error while creating new message")
        }
    }

    getMessages = async () => {
        try {
            const messages = await MessageModel.find({}).lean()
            if(messages.lenght === 0) throw new Error("No messages found")
            return messages;
        } catch (error) {
            throw new Error("Error while getting messages")
        }
    }

}