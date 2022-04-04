import { format, transports } from 'winston';
import expressWinston from 'express-winston';
import { loggerFormat } from './loggerFormat';
const { combine, timestamp } = format;
import dotenv from 'dotenv';
import { MongoDB } from 'winston-mongodb';
import { verifyTokenOrEmptyObject } from '../utils/jwt';
import { getUserNameForLogger } from '../controllers/auth/userIdGitHub';
dotenv.config();
const mongoOptions = {
  level: 'error',
  db: process.env.db ?? '',
  collection: 'logs',
  options: { useUnifiedTopology: true, }
};

export const productionLogger = expressWinston.logger({
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new MongoDB(mongoOptions)
  ],
  format: combine(
    timestamp(),
    loggerFormat
  ),
  meta: true,
  metaField: null,
  dynamicMeta: req => {
    const token = req.headers['authorization']?.replace('Bearer ', '') ?? '';
    const username = token ? (verifyTokenOrEmptyObject(token))?.name : '-';
    const user = getUserNameForLogger(req) ?? username;
    return { metadata: { user } };
  }
});
