import { request } from '../auth/auth.spec';
import { clearDatabase, closeDatabase, connect } from '../../db';
import { sendRequestToOLAndSaveDataError } from '../../../constants/errorsTexts';


jest.mock('../../../utils/dbConnection');

const getPath = (limit: number) => `/openlibrary/subjects/art.json?details=true&limit=${limit}&offset=1`;
const key = '/subjects/art';
const name = 'Art';

describe('Check method getOpenLibraryData (SuperTest)', () => {
    beforeAll(async () => await connect());
    afterEach(async () => await clearDatabase());
    afterAll(async () => await closeDatabase());

    it('should get correct count of data if limit 10', async () => {
        const path = getPath(10);
        const response = await request.get(path);
        expect(response.statusCode).toBe(200);
        const body = response.body;
        expect(body.key).toBe(key);
        expect(body.name).toBe(name);
        expect(body.works.length).toBe(10);
    });

    it('should get correct count of data if limit 2', async () => {
        const path = getPath(2);
        const response = await request.get(path);
        expect(response.statusCode).toBe(200);
        const body = response.body;
        expect(body.key).toBe(key);
        expect(body.name).toBe(name);
        expect(body.works.length).toBe(2);
    });

    it('should return correct error if limit -1', async () => {
        const path = '/openlibrary/subjects/art.json?details=true&limit=-1&offset=1';
        const response = await request.get(path);
        expect(response.statusCode).toBe(500);
        expect(response.body.name).toBe(sendRequestToOLAndSaveDataError);
    });
});