import { clearDatabase, closeDatabase, connect } from '../../db';
import { UserDataInstance } from '../../../models/user';
import { findUser } from '../../../controllers/auth/usersDatabase/findUser';

describe('Check findUser method', () => {
    const userId = 'testUser';
    const userData = { email: 'aaaaaa' };
    beforeAll(async () => await connect());
    afterEach(async () => await clearDatabase());
    afterAll(async () => await closeDatabase());

    it('should correct save user data', async () => {
        const testUser = await UserDataInstance.addUser({ id: userId, data : userData });
        await testUser.save();
        const user = await findUser(userId);
        expect(user?.id).toBe(userId);
        expect(JSON.stringify(user?.data)).toBe(JSON.stringify(userData));
    });
});