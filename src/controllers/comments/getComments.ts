import { Response, Request, NextFunction, } from 'express';
import { isLimitAndOffsetOfCommentsValid } from './isLimitAndOffsetOfCommentsValid';
import { getBookComments } from './commentsDatabase/getBookComments';
import { decode as base64_decode } from 'base-64';
import { LimitAndOffset } from '../../interfaces/LimitAndOffset';
import { CommentDoc } from '../../models/comment';

export const getComments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { isValid, offset, limit }: LimitAndOffset = isLimitAndOffsetOfCommentsValid(req);
        const result: CommentDoc[] = isValid ? await getBookComments(base64_decode(req.params.bookId), offset, limit) : await getBookComments(base64_decode(req.params.bookId));
        res.status(200).json(result);
    } catch(e) {
        next(e);
    }
};