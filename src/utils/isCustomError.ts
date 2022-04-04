import { CustomError } from '../interfaces/CustomError';

export const isCustomError = (object: any): object is CustomError => {
    return 'statusCode' in object && 'message' in object && 'name' in object;
};