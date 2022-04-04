import { Response, Request, NextFunction } from 'express';
import { CustomError } from '../interfaces/CustomError';

export const onError = (error: CustomError, req: Request, res: Response, next: NextFunction): void => {
    res.status(error.statusCode ?? 500).json({ message: error.message, name: error.name });
    res.end();
};