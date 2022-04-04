import { Response, Request, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();
export const corsMiddleware = function(req: Request, res: Response, next: NextFunction): void {
    res.header('Access-Control-Allow-Origin', process.env.WHITELISTED_DOMAINS);
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization, x-refresh-token, x-token');
    next();
};