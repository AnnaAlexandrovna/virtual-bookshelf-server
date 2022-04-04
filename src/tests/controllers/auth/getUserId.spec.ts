import { getUserId } from '../../../controllers/auth/getUserId';
import { getMockReq } from '@jest-mock/express';
import { isCustomError } from '../../../utils/isCustomError';

describe('getUserId method test', () => {
    const req = getMockReq();
    const headerName = 'userId';
    const incorrectHeaderName = 'user';
    const nameForTest = 'test';
    const nameNewForTest = 'test1';

    it('should return name', () => {
        req.headers[headerName] = nameForTest;
        const name = getUserId(req);
        expect(nameForTest).toEqual(name);
        req.headers[headerName] = nameNewForTest;
        const nameNew = getUserId(req);
        expect(nameNew).toEqual(nameNewForTest);
    });

    it('should return correct error if there is no necessary header', () => {
        const req = getMockReq();
        req.headers[incorrectHeaderName] = nameForTest;
        let userName = null;
        let error = null;
        try {
            userName = getUserId(req);
        } catch(e) {
            if(isCustomError(e)) {
                error = e;
            }
        }
        expect(userName).toBeNull();
        expect(error?.statusCode).toEqual(404);
        expect(error?.message).toEqual('req.headers.userId is not string');
        expect(error?.name).toEqual('Get userId was unsuccess');
    });
}
);