import { getMockReq, getMockRes } from '@jest-mock/express';
import { getOpenLibraryData } from '../../../controllers/openLibrary/getOpenLibraryData';
import { Error } from 'mongoose';

const resultOfSearchOrSave = { info: 123 };
const urlForTestFirst = '/openlibrary/subjects/art.json?details=true&limit=10&offset=1';
const shortFirstUrl = '/subjects/art.json?details=true&limit=10&offset=1';
const urlForTestSecond = '/openlibrary/subjects/123';
const shortSecondUrl = '/subjects/123';

const valueFromDB = jest.fn(path => path).mockReturnValueOnce({ data: resultOfSearchOrSave }).mockReturnValueOnce(undefined);
jest.mock('../../../controllers/openLibrary/OLDatabase/findPathInOLDatabase', () => ({
    findPathInOLDatabase: (path: any) => valueFromDB(path)
}));

const valueFromSaveDB = jest.fn(path => path).mockReturnValueOnce(resultOfSearchOrSave).mockRejectedValueOnce(new Error(''));
jest.mock('../../../controllers/openLibrary/sendRequestToOLAndSaveData', () => ({
    sendRequestToOLAndSaveData: (path: any) => valueFromSaveDB(path)
}));

describe('Check method getOpenLibraryData ', () => {
    const req = getMockReq();
    const res = getMockRes();
    it('should return 200 and correct value if value find in DB', async () => {
        req.url = urlForTestFirst;
        await getOpenLibraryData(req, res.res, res.next);
        expect(valueFromDB).toBeCalledWith(shortFirstUrl);
        expect(res.res.status).toBeCalledWith(200);
        expect(res.res.json).toBeCalledWith(resultOfSearchOrSave);
    });

    it('should return 200 and correct value if value save and return from DB', async () => {
        req.url = urlForTestSecond;
        await getOpenLibraryData(req, res.res, res.next);
        expect(valueFromSaveDB).toBeCalledWith(shortSecondUrl);
        expect(res.res.status).toBeCalledWith(200);
        expect(res.res.json).toBeCalledWith(resultOfSearchOrSave);
    });

    it('should call next if get error', async () => {
        req.url = urlForTestSecond;
        await getOpenLibraryData(req, res.res, res.next);
        expect(valueFromSaveDB).toBeCalledWith(shortSecondUrl);
        expect(res.next).toHaveBeenCalledTimes(1);
    });
});