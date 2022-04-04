import { Router } from 'express';
import { rejectToken } from '../controllers/auth/rejectToken';
import { updateToken } from '../controllers/auth/updateToken';

export const tokensRouter: Router = Router();
tokensRouter.post('/', updateToken);
tokensRouter.get('/reject', rejectToken);