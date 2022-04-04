import { CommentInstance } from '../../../models/comment';
import { updateBookCommentError } from '../../../constants/errorsTexts';
import { getCustomError } from '../../../utils/getCustomError';

export const updateBookComment = async (_id: string, data: string): Promise<void> => {
    try {
        await CommentInstance.updateOne({ _id }, { data }, { upsert: true });
    } catch(e) {
        throw getCustomError(e, updateBookCommentError, 500);
    }
};