import { CustomError } from '../interfaces/CustomError';

export const getCustomError = (e: Error | unknown, name: string, statusCode: number): CustomError => {
    let message = 'Error';
    if(e instanceof Error) {
        message = e.message;
    }
    const error: CustomError = { statusCode, message, name };
    return error;
};
