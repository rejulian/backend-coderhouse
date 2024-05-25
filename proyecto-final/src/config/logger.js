import winston from 'winston';

const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5,
    }
}

export const prodLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.File({filename:'./errors.log', level:'info'})
    ]
})

export const devLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports:[
        new winston.transports.Console({level:"debug"})
    ]
})
