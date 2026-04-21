import { NextFunction, Request, Response } from 'express';
import { AppError } from '../types/errors.js';

export const notFound = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const err = new Error(`Route not found: ${req.method} ${req.originalUrl}`) as AppError;
  err.status = 404;
  err.log = `notFound middleware: ${req.method} ${req.originalUrl}`;
  return next(err);
};