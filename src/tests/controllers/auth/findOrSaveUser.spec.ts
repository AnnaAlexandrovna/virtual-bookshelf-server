import { findOrSaveUser } from '../../../controllers/auth/usersDatabase/findOrSaveUser';
import { UserDataInstance } from '../../../models/user';
import { clearDatabase, closeDatabase, connect } from '../../db';

const saveUserFn = jest.fn((id, data) => ({id, data}));
jest.mock('../../../controllers/auth/usersDatabase/saveUser', ()=> ({
    saveUser: (id:any, data:any) => saveUserFn(id, data)
}));

describe('Check authorization', () => {
    beforeAll(async () => await connect());
    afterEach(async () => await clearDatabase());
    afterAll(async () => await closeDatabase());


    it('should correct find user data', async () => {
        await UserDataInstance.addUser({ id: 'testUser', data : {email: 'aaaaaa'} });
        await findOrSaveUser('testUser1', {email: '11111'});
        expect(saveUserFn).toHaveBeenCalled();
    });
});