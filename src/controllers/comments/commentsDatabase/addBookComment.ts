import { CommentDoc, CommentInstance } from '../../../models/comment';
import { addBookCommentError } from '../../../constants/errorsTexts';
import { getCustomError } from '../../../utils/getCustomError';

export const addBookComment = async (userId: string, bookId: string, data: string): Promise<CommentDoc> => {
    try {
        const comment: CommentDoc = await CommentInstance.addComment({ userId, data, createdAt: new Date(), bookId });
        await comment.save();
        return comment;
    } catch(e) {
        throw getCustomError(e, addBookCommentError, 500);
    }
};