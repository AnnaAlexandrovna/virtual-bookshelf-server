import { FavoriteDataInstance, FavoriteDoc } from '../../../models/favorite';
import { findUserFavoritesError } from '../../../constants/errorsTexts';
import { getCustomError } from '../../../utils/getCustomError';

export const findUserFavorites = async (userId: string): Promise<FavoriteDoc | null > => {
    try {
        const search: FavoriteDoc | null = await FavoriteDataInstance.findOne({ userId });
        return search;
    } catch(e) {
        throw getCustomError(e, findUserFavoritesError, 500);
    }
};