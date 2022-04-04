import { CommentDoc, CommentInstance } from '../../../models/comment';
import { getBookCommentsError } from '../../../constants/errorsTexts';
import { getCustomError } from '../../../utils/getCustomError';

export const getBookComments = async (bookId: string, offset?: number, limit?: number):  Promise<CommentDoc[]> => {
    try {
        const search: CommentDoc[] = offset !== undefined && limit !== undefined ?
            await CommentInstance.find({ bookId }).skip(offset).limit(limit) ?? [] : await CommentInstance.find({ bookId }) ?? [];
        return search;
    } catch(e) {
        throw getCustomError(e, getBookCommentsError, 500);
    }
};