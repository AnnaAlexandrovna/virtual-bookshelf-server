import { Response, Request, NextFunction } from 'express';
import { deleteRefreshToken } from './tokensDatabase/deleteRefreshToken';
import { findTokenByRefreshToken } from './tokensDatabase/findTokenByRefreshToken';
import { getRefreshTokenFromHeaders } from '../../utils/jwt';
import { CustomError } from '../../interfaces/CustomError';
import { rejectTokenError } from '../../constants/errorsTexts';
import { TokenDoc } from '../../models/refreshToken';

export const rejectToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const refreshToken: string = getRefreshTokenFromHeaders(req);
        const search: TokenDoc | null = await findTokenByRefreshToken(refreshToken);
        if(search) {
            await deleteRefreshToken(refreshToken);
            res.sendStatus(204);
        } else {
            const error: CustomError = { statusCode: 404, message: rejectTokenError, name: rejectTokenError };
            throw error;
        }
    } catch(e) {
        next(e);
    }
};