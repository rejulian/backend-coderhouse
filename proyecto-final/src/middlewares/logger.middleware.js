import { logger } from "../config/logger.js"

export const addLogger = (req,res,next) => {
    req.logger = logger;
    req.logger.http(`Method:${req.method} - URL:${req.url} - ${new Date().toLocaleString()}`)

    next();
}