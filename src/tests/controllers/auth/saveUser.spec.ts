import { clearDatabase, closeDatabase, connect } from '../../db';
import { saveUser } from '../../../controllers/auth/usersDatabase/saveUser';
import { UserDataInstance } from '../../../models/user';

describe('Check saveUser method', () => {
    const userId = 'testUser';
    const userData = { email: 'aaaaaa' };
    beforeAll(async () => await connect());
    afterEach(async () => await clearDatabase());
    afterAll(async () => await closeDatabase());

    it('should correct save user data', async () => {
        await saveUser(userId, userData);
        const user = await UserDataInstance.findOne({ id: userId });
        expect(user?.id).toBe(userId);
        expect(JSON.stringify(user?.data)).toBe(JSON.stringify(userData));
    });
});