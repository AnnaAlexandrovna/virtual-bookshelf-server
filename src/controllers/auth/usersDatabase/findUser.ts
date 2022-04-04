import { UserDataInstance, UserDoc } from '../../../models/user';
import { findUserError } from '../../../constants/errorsTexts';
import { getCustomError } from '../../../utils/getCustomError';

export const findUser = async (id: string): Promise<UserDoc | null > => {
    try {
        const search: UserDoc | null = await UserDataInstance.findOne({ id });
        return search;
    }
    catch(e) {
        throw getCustomError(e, findUserError, 500);
    }
};