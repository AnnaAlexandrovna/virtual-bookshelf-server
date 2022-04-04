import { app } from '../../../app';
import supertest from 'supertest';
import dotenv from 'dotenv';
import { clearDatabase, closeDatabase, connect } from '../../db';
import { userObj } from '../../mock/userProfile';
import { verifyTokenOrEmptyObject } from '../../../utils/jwt';
dotenv.config();

jest.mock('../../../utils/dbConnection');

export const request = supertest(app);

describe('Check authorization', () => {
    beforeAll(async () => await connect());
    afterEach(async () => await clearDatabase());
    afterAll(async () => await closeDatabase());
    
    it('should redirect to correct page', async () => {
        const response = await request.get('/auth/github');
        expect(response.status).toBe(302);
        expect(decodeURIComponent(response.headers.location + ''))
            .toBe(`https://github.com/login/oauth/authorize?response_type=code&redirect_uri=${process.env.GITHUB_CALLBACK_URL}&scope=user:email&client_id=${process.env.GITHUB_CLIENT_ID}`);
    });

    it('should redirect to correct UI link with token and refreshToken', async () => {
        const response = await request.get('/auth/github/callback?code=856ddf171fd0d51487b7');
        const location = response.headers.location;
        const linkLength = process.env.LOGIN_PAGE?.length ?? 0;
        const token = location.substr(linkLength+7, 165);
        const refresh = location.substr(linkLength+7+165).replace('&refreshToken=', '');
        const payload = verifyTokenOrEmptyObject(token);
        expect(location.substr(0,linkLength+7)).toBe(`${process.env.LOGIN_PAGE}?token=`);
        expect(payload.name).toBe(userObj.emails[0].value);
        expect(refresh.length).toBe(256);
    });

});