import { TicketModel } from "../models/ticket.model.js"

export class TicketManager {

    createTicket = async ({code, purchase_datetime, amount, purchaser}) => {
        try {
            const newTicket = await TicketModel.create({code, purchase_datetime, amount, purchaser})
            return newTicket
        } catch (error) {
            throw new Error(error.message)
        }
    }

    getTicketById = async (id) => {
        try {
            const ticket = await TicketModel.findById(id)
            return ticket
        } catch (error) {
            throw new Error(error.message)
        }
    }

}