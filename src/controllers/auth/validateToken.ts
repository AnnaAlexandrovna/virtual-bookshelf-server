import { getToken } from '../auth/getToken';
import { Response, Request, NextFunction } from 'express';
import { validateTokenError } from '../../constants/errorsTexts';
import { getCustomError } from '../../utils/getCustomError';

export const validateToken = (req: Request, res: Response, next: NextFunction): void => {
    try {
        req.headers['userId'] = getToken(req).name;
        next();
    } catch(e) {
        next(getCustomError(e, validateTokenError, 401));
    }
};