import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.ts';
import { sendError } from '../utils/response.ts';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error(`${err.message} - ${req.method} ${req.url}`);

  if (err.name === 'ZodError') {
    return sendError(res, 400, 'Validation Error', err.errors);
  }

  if (err.name === 'MongoError' || err.code === 11000) {
    return sendError(res, 400, 'Duplicate Key Error');
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return sendError(res, statusCode, message);
};
