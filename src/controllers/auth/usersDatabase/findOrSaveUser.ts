import { findUser } from './findUser';
import { saveUser } from './saveUser';
import { findOrSaveUserError } from '../../../constants/errorsTexts';
import { UserDoc } from '../../../models/user';
import { getCustomError } from '../../../utils/getCustomError';

export const findOrSaveUser = async (userId: string, data: Object): Promise<void> => {
    try {
        let res: UserDoc | null = await findUser(userId);
        if(!res) {
            await saveUser(userId, data);
            res = await findUser(userId);
        }
    } catch(e) {
        throw getCustomError(e, findOrSaveUserError, 500);
    }
};