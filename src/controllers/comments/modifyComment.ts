import { Response, Request, NextFunction } from 'express';
import { updateBookComment } from './commentsDatabase/updateBookComment';
import { isUserAuthorOfComment } from './isUserAuthorOfComment';

export const modifyComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await isUserAuthorOfComment(req);
        await updateBookComment(req.params.commentId, req.body.comment);
        res.sendStatus(204);
    } catch(e) {
        next(e);
    }
};