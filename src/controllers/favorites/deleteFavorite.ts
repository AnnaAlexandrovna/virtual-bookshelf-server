import { Response, Request, NextFunction } from 'express';
import { deleteFavoriteFromDatabase } from './favoritesDatabase/deleteFavoriteFromDatabase';
import { getUserId } from '../auth/getUserId';

export const deleteFavorite = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if(typeof req.query['bookId'] !== 'string') {
            throw new Error('bookId is not string');
        }
        const query: string = req.query['bookId'];
        const userId: string = getUserId(req);
        await deleteFavoriteFromDatabase(userId, query);
        res.sendStatus(204);
    } catch(e) {
        next(e);
    }
};