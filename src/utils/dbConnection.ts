import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
export const dbConnection = (): void => {
    const connectionOptions = {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: process.env.NAME,
        pass: process.env.PASSWORD
    };
    try {
        mongoose.connect(process.env.db ?? '',
            connectionOptions).catch(
                error => console.error(error));
    } catch(e) {
        console.error(e);
    }
};