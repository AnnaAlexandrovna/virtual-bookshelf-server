import { TokenInstance } from '../../../models/refreshToken';
import { updateTokenError } from '../../../constants/errorsTexts';
import { getCustomError } from '../../../utils/getCustomError';

export const upsertRefreshToken = async (refreshToken: string, userId: string): Promise<void> => {
    try {
        await TokenInstance.updateOne({ userId }, { userId, refreshToken }, { upsert: true });
    }
    catch(e) {
        throw getCustomError(e, updateTokenError, 500);
    }
};