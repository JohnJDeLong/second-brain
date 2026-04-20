import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.js';

export interface AuthRequest extends Request {
    user?: {
        id: string; 
    };
}

export const requireAuth = ( req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try{
        const payload = verifyToken(token);
        req.user = { id: payload.id }; 
        return next(); 

    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
 }