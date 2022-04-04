import { Response, Request, NextFunction } from 'express';
import { isUserAuthorOfComment } from './isUserAuthorOfComment';
import { deleteBookComment } from './commentsDatabase/deleteBookComment';

export const deleteComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await isUserAuthorOfComment(req);
        await deleteBookComment(req.params.commentId);
        res.sendStatus(204);
    } catch(e) {
        next(e);
    }
};
