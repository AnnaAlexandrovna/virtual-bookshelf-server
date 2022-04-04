import { Response, Request, NextFunction } from 'express';
import { upsertUserFavorites } from './favoritesDatabase/upsertUserFavorite';
import { getUserId } from '../auth/getUserId';

export const addFavorite = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId: string = getUserId(req);
        await upsertUserFavorites(userId, req.body, req.body?.key);
        res.sendStatus(204);
    } catch(e) {
        next(e);
    }
};