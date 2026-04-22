import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.js';
import { AppError } from '../types/errors.js';

export interface AuthRequest extends Request {
    user?: {
        id: string; 
    };
}

export const requireAuth = ( req: AuthRequest, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        const err = new Error('Unauthorized') as AppError; 
        err.status = 401; 
        err.log = 'authMiddleware.requireAuth: missing or malformed authorization header';
        return next (err); 
    }

    const token = authHeader.split(' ')[1];

    try{
        const payload = verifyToken(token);
        req.user = { id: payload.id }; 
        return next(); 
    } catch (error) {
        const err = new Error('Invalid token') as AppError;
        err.status = 401;
        err.log = 'authMiddleware.requireAuth: token verification failed';
        return next(err);
    }
 }