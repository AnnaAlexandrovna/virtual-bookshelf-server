import { FavoriteDataInstance } from '../../../models/favorite';
import { deleteFavoriteFromDatabaseError } from '../../../constants/errorsTexts';
import { getCustomError } from '../../../utils/getCustomError';

export const deleteFavoriteFromDatabase = async (userId: string, key: string): Promise<void> => {
    try {
        await FavoriteDataInstance.updateMany({ userId }, { $pull: { data: { key } } });
    } catch(e) {
        throw getCustomError(e, deleteFavoriteFromDatabaseError, 500);
    }
};