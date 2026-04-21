import { NextFunction, Request, Response } from 'express';
import { AppError } from '../types/errors.js';

export const errorHandler = ( err: AppError, _req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err); 
    }

    if (err.log) {
        console.error(err.log);
    } else { 
        console.error(err)
    }
    return res.status(err.status ?? 500).json({
        error: err.message || 'Internal server error',
    });
};
