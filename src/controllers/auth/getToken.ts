import { Request } from 'express';
import { verifyToken, getTokenFromHeaders } from '../../utils/jwt';
import { JwtPayload } from 'jsonwebtoken';

export const getToken = (req: Request): JwtPayload => {
    return verifyToken(getTokenFromHeaders(req));
};