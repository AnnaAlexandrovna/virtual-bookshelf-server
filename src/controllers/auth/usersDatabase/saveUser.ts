import { UserDataInstance, UserDoc } from '../../../models/user';
import { saveUserError } from '../../../constants/errorsTexts';
import { getCustomError } from '../../../utils/getCustomError';

export const saveUser = async (id: string, data: Object): Promise<void> => {
    try {
        const user: UserDoc = await UserDataInstance.addUser({ id, data });
        await user.save();
    } catch(e) {
        throw getCustomError(e, saveUserError, 500);
    }
};