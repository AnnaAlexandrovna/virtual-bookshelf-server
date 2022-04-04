import { format } from 'winston';
export const loggerFormat = format.printf(({ level, message, timestamp, metadata }) => {
    return `${timestamp} ${metadata.user} ${level}: ${message}`;
});