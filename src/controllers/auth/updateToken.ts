import { Response, Request, NextFunction } from 'express';
import { upsertRefreshToken } from './tokensDatabase/upsertRefreshToken';
import { findTokenByRefreshToken } from './tokensDatabase/findTokenByRefreshToken';
import { generateTokens, getRefreshTokenFromHeaders } from '../../utils/jwt';
import { CustomError } from '../../interfaces/CustomError';
import { updateTokenError } from '../../constants/errorsTexts';
import { GeneratedTokens } from '../../interfaces/GeneratedTokens';
import { TokenDoc } from '../../models/refreshToken';

export const updateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const refreshToken: string = getRefreshTokenFromHeaders(req);
        const search: TokenDoc | null = await findTokenByRefreshToken(refreshToken);
        if(search) {
            const tokenData: GeneratedTokens = generateTokens(search?.userId);
            await upsertRefreshToken(tokenData.refreshToken, search?.userId);
            res.status(200).json(tokenData);
        } else {
            const error: CustomError = { statusCode: 401, message: updateTokenError, name: updateTokenError };
            throw error;
        }
    } catch(e) {
        next(e);
    }
};