import { Router } from 'express';
import { passportGitHub } from '../utils/githubAuth';
import { userIdGitHub } from '../controllers/auth/userIdGitHub';
import { redirectUI } from '../controllers/auth/redirectUI';
import { authenticateMock } from '../tests/mock/authenticateMock';
import dotenv from 'dotenv';
dotenv.config();

export const authGithubRouter: Router = Router();
export const authenticateForTest = (req:any, res:any, next:any) => authenticateMock(req, res, next);
export const authenticateForDev = passportGitHub.authenticate('github', { failureRedirect: '/login', session: false });
export const authenticate = process.env.NODE_ENV === 'test' ? (req:any, res:any, next:any) => authenticateForTest(req, res, next) : authenticateForDev;
authGithubRouter.get('/', passportGitHub.authenticate('github'));
authGithubRouter.get(
    '/callback',
    authenticate,
    userIdGitHub,
    redirectUI
);