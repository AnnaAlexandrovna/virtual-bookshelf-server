import { passportGitHub } from '../../utils/githubAuth';
import { userObj } from './userProfile';

export const authenticateMock = (req: any, res: any, next: any) => {
    passportGitHub.authenticate('github', () => {
        req.user = userObj;
        next();
    })(req, res, next);
};