import { Request } from 'express';
import { getUserIdError } from '../../constants/errorsTexts';
import { getCustomError } from '../../utils/getCustomError';

export const getUserId = (req: Request): string => {
    try {
        if(typeof req.headers.userId !== 'string') {
            throw new Error('req.headers.userId is not string');
        }
        return req.headers.userId;
    } catch(e) {
        throw getCustomError(e, getUserIdError, 404);
    }
};