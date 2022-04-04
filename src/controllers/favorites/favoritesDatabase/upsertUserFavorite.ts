import { FavoriteDataInstance } from '../../../models/favorite';
import { upsertUserFavoritesError } from '../../../constants/errorsTexts';
import { getCustomError } from '../../../utils/getCustomError';

export const upsertUserFavorites = async (userId: string, data: Object, key: string): Promise<void> => {
    try {
        await FavoriteDataInstance.updateOne({ userId }, { $push: { data: [{ key, data }] } }, { upsert: true });
    } catch(e) {
        throw getCustomError(e, upsertUserFavoritesError, 500);
    }
};