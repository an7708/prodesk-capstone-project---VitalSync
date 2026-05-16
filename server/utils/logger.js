const logger = {
    info: (msg, meta) => console.log(`[INFO] ${msg}`, meta || ''),
    error: (msg, meta) => console.error(`[ERROR] ${msg}`, meta || ''),
    warn: (msg, meta) => console.warn(`[WARN] ${msg}`, meta || ''),
};

module.exports = logger;    
    
    
    
    
    
    
    
    
    
    
    
    // const winston = require('winston');

    // const logger = winston.createLogger({
    // level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
    // format: winston.format.combine(
    // winston.format.timestamp(),
    // winston.format.json()
    // ),
    // transports: [
    // new winston.transports.Console({
    //     silent: process.env.NODE_ENV === 'production',
    // }),
    // ],
    // });

    // module.exports = logger;