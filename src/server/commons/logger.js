import winston from 'winston';
import { productionLabel } from './constants';
import winstonConfig from '../configs/winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(winstonConfig.file),
    new winston.transports.Console(winstonConfig.console),
  ],
  exitOnError: false,
});

export function info(str) {
  logger.log({ level: 'info', message: str });
}

export function debug(str) {
  logger.log({ level: 'debug', message: str });
}

export function error(str) {
  logger.log({ level: 'error', message: str });
}

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== productionLabel) {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

export default logger;
