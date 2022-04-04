import { TokenInstance, TokenDoc } from '../../../models/refreshToken';
import { findTokenError } from '../../../constants/errorsTexts';
import { getCustomError } from '../../../utils/getCustomError';

export const findTokenByRefreshToken = async (refreshToken: string): Promise<TokenDoc | null > => {
    try {
        const search: TokenDoc | null = await TokenInstance.findOne({ refreshToken });
        return search;
    } catch(e) {
        throw getCustomError(e, findTokenError, 500);
    }
};