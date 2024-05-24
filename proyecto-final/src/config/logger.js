import winston from 'winston';

//configuracion
export const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({level:'warn'}),
        new winston.transports.File({filename:'./errors.log', level:'http'})
    ]
})

// 0-error
// 1-warn
// 2-info
// 3-http
// 4-verbose
// 5-debug
// 6-silly
