import { CommentDoc, CommentInstance } from '../../../models/comment';
import { findCommentError } from '../../../constants/errorsTexts';
import { getCustomError } from '../../../utils/getCustomError';

export const findCommentByUserIdAndCommentId = async (_id: string, userId: string): Promise<CommentDoc | null> => {
    try {
        const result: CommentDoc | null = await CommentInstance.findOne({ _id, userId });
        return result;
    } catch(e) {
        throw getCustomError(e, findCommentError, 500);
    }
};