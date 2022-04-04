import { Response, Request, NextFunction } from 'express';
import { addBookComment } from './commentsDatabase/addBookComment';
import { getUserId } from '../auth/getUserId';
import { decode as base64_decode } from 'base-64';
import { CommentDoc } from '../../models/comment';

export const addComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId: string = getUserId(req);
        const bookId: string = base64_decode(req.params.bookId);
        const addedComment: CommentDoc = await addBookComment(userId, bookId, req.body.comment);
        res.status(200).json(addedComment);
    } catch(e) {
        next(e);
    }
};