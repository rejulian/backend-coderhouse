import { program } from "../config/commander.config.js";
import { prodLogger, devLogger } from "../config/logger.js"

export const addLogger = (req,res,next) => {

    if(program.opts().mode === "production"){
        req.logger = prodLogger;
    }else{
        req.logger = devLogger
    }
    next();
}
// req.logger.http(`Method:${req.method} - URL:${req.url} - ${new Date().toLocaleString()}`)