import { Request } from 'express';
import { LimitAndOffset } from '../../interfaces/LimitAndOffset';

export const isLimitAndOffsetOfCommentsValid = (req: Request): LimitAndOffset => {
    try {
        if(typeof req.query['offset'] === 'string' && req.query['limit'] === 'string') {
            const offset: number = parseInt(req.query['offset']);
            const limit: number = parseInt(req.query['limit']);
            if(((offset === 0) || offset) && ((limit === 0) || limit)) {
                return { isValid: true, offset, limit };
            } else {
                throw Error('params is invalid');
            }
        } else {
            throw Error('offset or limit is not string');
        }
    } catch(e) {
        return { isValid: false };
    }
};