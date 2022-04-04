import { Response, Request, NextFunction } from 'express';
import dotenv from 'dotenv';
import { generateTokens } from '../../utils/jwt';
import { findOrSaveUser } from './usersDatabase/findOrSaveUser';
import { upsertRefreshToken } from './tokensDatabase/upsertRefreshToken';
import { getUserId } from './getUserId';
import { redirectUIError } from '../../constants/errorsTexts';
import { CustomError } from '../../interfaces/CustomError';
import { GeneratedTokens } from '../../interfaces/GeneratedTokens';

dotenv.config();
export const redirectUI = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId: string = getUserId(req);
        if(req.user) {
            await findOrSaveUser(userId, req.user);
            const tokenData: GeneratedTokens = generateTokens(userId);
            await upsertRefreshToken(tokenData.refreshToken, userId);
            res.redirect(`${process.env.LOGIN_PAGE}?token=${tokenData.token}&refreshToken=${tokenData.refreshToken}`);
        } else {
            const error: CustomError = { statusCode: 404, message: redirectUIError, name: redirectUIError };
            throw error;
        }
    } catch(e) {
        next(e);
    }
};