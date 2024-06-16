const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    logFormat,
    colorize()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/combined.log', options: { flags: 'w' }}),
    new transports.File({ filename: 'logs/errors.log', level: 'error', options: { flags: 'w' } })
  ],
  exceptionHandlers: [
    new transports.File({ filename: 'logs/exceptions.log', options: { flags: 'w' } })
  ],
  rejectionHandlers: [
    new transports.File({ filename: 'logs/rejections.log', options: { flags: 'w' } })
  ]
});



module.exports = logger;