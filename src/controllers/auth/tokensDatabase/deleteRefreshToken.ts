import { TokenInstance } from '../../../models/refreshToken';
import { deleteRefreshTokenError } from '../../../constants/errorsTexts';
import { getCustomError } from '../../../utils/getCustomError';

export const deleteRefreshToken = async (refreshToken: string): Promise<void> => {
    try {
        await TokenInstance.deleteOne({ refreshToken });
    } catch(e) {
        throw getCustomError(e, deleteRefreshTokenError, 500);
    }
};