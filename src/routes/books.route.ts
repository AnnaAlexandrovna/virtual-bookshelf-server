import express, { Router } from 'express';
import { validateToken } from '../controllers/auth/validateToken';
import { addComment } from '../controllers/comments/addComment';
import { deleteComment } from '../controllers/comments/deleteComment';
import { getComments } from '../controllers/comments/getComments';
import { modifyComment } from '../controllers/comments/modifyComment';

export const commentsRouter: Router = Router();
commentsRouter.post('/:bookId/comments', validateToken, express.json(), addComment);
commentsRouter.get('/:bookId/comments', getComments);
commentsRouter.delete('/comments/:commentId', validateToken, deleteComment);
commentsRouter.put('/comments/:commentId', validateToken, express.json(), modifyComment);