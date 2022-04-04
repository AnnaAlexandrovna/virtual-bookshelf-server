import { findCommentByUserIdAndCommentId } from './commentsDatabase/findCommentByUserIdAndCommentId';
import { Request } from 'express';
import { getUserId } from '../auth/getUserId';
import { isUserAuthorOfCommentError } from '../../constants/errorsTexts';
import { CustomError } from '../../interfaces/CustomError';
import { CommentDoc } from '../../models/comment';

export const isUserAuthorOfComment = async (req: Request): Promise<void> => {
    const userId: string = getUserId(req);
    const result: CommentDoc | null = await findCommentByUserIdAndCommentId(req.params.commentId, userId);
    if(!result) {
        const error: CustomError = { statusCode: 403, message: isUserAuthorOfCommentError, name: isUserAuthorOfCommentError };
        throw error;
    }
};