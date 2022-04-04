import mongoose from 'mongoose';

const UsersSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    }
});

interface User {
    id: string;
    data: Object;
};

export interface UserDoc extends mongoose.Document {
    id: string;
    data: object;
};

interface UserModel extends mongoose.Model<UserDoc> {
    addUser(user: User): UserDoc;
};

UsersSchema.statics.addUser = (data: User) => {
    return new UserDataInstance(data);
};

export const UserDataInstance: UserModel = mongoose.model<UserDoc, UserModel>('users', UsersSchema);
