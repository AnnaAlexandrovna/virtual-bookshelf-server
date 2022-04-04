import dotenv from 'dotenv';
import { developmentLogger } from './developmentLogger';
import { productionLogger } from './productionLogger';
dotenv.config();

export let logger = process.env.NODE_ENV == 'production' ? productionLogger : developmentLogger;
