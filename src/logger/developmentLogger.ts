import { format, transports } from 'winston';
import expressWinston from 'express-winston';
import { verifyTokenOrEmptyObject } from '../utils/jwt';
import { getUserNameForLogger } from '../controllers/auth/userIdGitHub';
import { loggerFormat } from './loggerFormat';

export const developmentLogger = expressWinston.logger({
  transports: [
    new transports.File({ filename: 'errorDevelopment.log', level: 'error' }),
    new transports.File({ filename: 'accessDevelopment.log', level: 'info' }),
    new transports.Console({ format: format.colorize({ all: true }) }),
  ],
  format: format.combine(
    format.timestamp(),
    loggerFormat
  ),
  meta: true,
  metaField: null,
  dynamicMeta: req => {
    const token = req.headers['authorization']?.replace('Bearer ', '') ?? '';
    const username = token ? (verifyTokenOrEmptyObject(token))?.name : '-';
    const user = getUserNameForLogger(req) ?? username;
    return { metadata: { user } };
  },
  colorize: false,
  statusLevels: true,
});