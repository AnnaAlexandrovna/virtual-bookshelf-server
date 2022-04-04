import { Response, NextFunction, Request } from 'express';
import { User } from '../../interfaces/User';
import { userIdGitHubError } from '../../constants/errorsTexts';
import { CustomError } from '../../interfaces/CustomError';
import { getCustomError } from '../../utils/getCustomError';

export const userIdGitHub = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const userId: string = getUserName(req);
        req.headers.userId = userId;
        next();
    } catch(e) {
        next(getCustomError(e, userIdGitHubError, 500));
    }
};

export const getUserName = (req: Request): string => {
    const error: CustomError = { statusCode: 500, message: 'req.user is undefined', name: 'req.user is undefined' };
    if(req.user) {
        const request: User = req.user;
        const userId: string | undefined = request?.emails?.[0]?.value ?? request?.username;
        if(!userId) {
            throw error;
        }
        return userId;
    } else {
        throw error;
    }
};

export const getUserNameForLogger = (req: Request): string | undefined => {
    try {
        return getUserName(req);
    }
    catch(e) {
        return undefined;
    }
};

