const { createLogger, format, transports } = require('winston')

module.exports = createLogger({
    format: format.combine(format.simple()),
    transports: [
        new transports.File({
            filename: `${__dirname}/../logs/error-api.log`,
            level: 'error',
        }),
        new transports.File({
            filename: `${__dirname}/../logs/warn-api.log`,
            level: 'warn',
        }),
        new transports.Console({
            level: 'verbose',
        })
    ]
})