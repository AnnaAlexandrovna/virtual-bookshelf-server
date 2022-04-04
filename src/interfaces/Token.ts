import jwt from 'jsonwebtoken';

export interface Token extends jwt.JwtPayload {
    name: string
}