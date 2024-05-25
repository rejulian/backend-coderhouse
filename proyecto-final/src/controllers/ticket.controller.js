import { TicketManager } from "../dao/mongoManagers/mongoTicketManager.js";
import { v4 as uuidv4 } from 'uuid';

const ticketManager = new TicketManager()

export const createTicket = async (amount, purchaser) => {
    try {
        if( !amount || !purchaser) throw new Error("Cannot create ticket")
        const code = uuidv4()
        const purchase_datetime = new Date()
        const newTicket = await ticketManager.createTicket({code, purchase_datetime, amount, purchaser})
        return newTicket
    } catch (error) {
        req.logger.error(`${error} - ${new Date().toLocaleString()}`)
        return error.message
    }
}
