import { CommentInstance } from '../../../models/comment';
import { CustomError } from '../../../interfaces/CustomError';
import { deleteBookCommentError } from '../../../constants/errorsTexts';
import { getCustomError } from '../../../utils/getCustomError';

export const deleteBookComment = async (_id: string): Promise<void> => {
    try {
        await CommentInstance.deleteOne({ _id });
    } catch(e) {
        throw getCustomError(e, deleteBookCommentError, 500);
    }
};