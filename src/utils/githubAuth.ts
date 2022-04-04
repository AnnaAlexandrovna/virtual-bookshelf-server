import passport from 'passport';
import dotenv from 'dotenv';
import { Profile } from 'passport-github2';
import * as PassportGithub2 from 'passport-github2';

dotenv.config();
const GitHubStrategy = PassportGithub2.Strategy;
export const passportGitHub = passport;
let Strategy: PassportGithub2.Strategy;

Strategy = new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID ?? '',
    clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
    callbackURL: process.env.GITHUB_CALLBACK_URL ?? '',
    scope: ['user:email']
},
    (_accessToken: string, _refreshToken: string, profile: Profile, done: Function) => {
        process.nextTick(() => done(null, profile));
    }
);

passportGitHub.initialize();
passportGitHub.use(Strategy);