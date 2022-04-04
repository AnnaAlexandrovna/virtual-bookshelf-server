import { Response, Request, NextFunction } from 'express';
import { findUserFavorites } from '../favorites/favoritesDatabase/findUserFavorites';
import { getUserId } from '../auth/getUserId';
import { FavoriteDoc } from '../../models/favorite';

export const getFavorites = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId: string = getUserId(req);
        const searchResult: FavoriteDoc | null = await findUserFavorites(userId);
        res.status(200).json(searchResult !== null ? searchResult?.data : {});
    } catch(e) {
        next(e);
    }
};
