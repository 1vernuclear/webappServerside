const winston = require('winston');

const logger = winston.createLogger({
    level: 'info', // Minimum level of messages to log
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }), // Log the stack trace if available
        winston.format.splat(),
        winston.format.json() // Log in JSON format
    ),
    transports: [
        // Write all logs with level `info` and below to `combined.log` 
        // Write all logs with level `error` and below to `error.log`
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

// If we're not in production, log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
}

module.exports = logger;
