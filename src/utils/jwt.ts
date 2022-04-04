import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import randtoken from 'rand-token';
import { Request } from 'express';
import { getTokenFromHeadersError } from '../constants/errorsTexts';
import { GeneratedTokens } from '../interfaces/GeneratedTokens';
import { Payload } from '../interfaces/Payload';
import { getCustomError } from './getCustomError';
dotenv.config();
export const SECRET: string = process.env.SECRET_FOR_JWT ?? 'Virtual bookshelf secret';

export const generateTokens = (userId: string): GeneratedTokens => {
    const name: string = userId;
    const payload: Payload = { name };
    const token: string = jwt.sign(payload, SECRET, { expiresIn: 1000 });
    const refreshToken: string = randtoken.uid(256);
    return { refreshToken, token, name };
};

export const verifyToken = (token: string): JwtPayload => {
    const tokensObj = jwt.verify(token, SECRET);
    if(typeof tokensObj === 'string') {
        throw new Error('jwt.verify is not string');
    }
    return tokensObj;
};

export const getTokenFromHeaders = (req: Request): string => {
    try {
        return req.headers['authorization']?.replace('Bearer ', '') ?? '';
    } catch(e) {
        throw getCustomError(e, getTokenFromHeadersError, 401);
    }
};

export const getRefreshTokenFromHeaders = (req: Request): string => {
    try {
        let refreshToken = req.headers['x-refresh-token'];
        if(Array.isArray(refreshToken)) {
            throw new Error('refreshToken is array');
        }
        return refreshToken ?? '';
    } catch(e) {
        throw getCustomError(e, getTokenFromHeadersError, 401);
    }
};

export const verifyTokenOrEmptyObject = (token: string): JwtPayload => {
    try {
        const tokens = jwt.verify(token, SECRET);
        if(typeof tokens === 'string') {
            throw new Error('token is string');
        }
        return tokens;
    } catch(e) {
        return { name: '-' };
    }
};