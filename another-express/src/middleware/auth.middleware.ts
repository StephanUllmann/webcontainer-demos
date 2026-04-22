import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service.ts';
import { sendError } from '../utils/response.ts';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}

export const authGuard = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  if (!token) {
    return sendError(res, 401, 'Unauthorized - No token provided');
  }

  const decoded = AuthService.verifyToken(token);
  if (!decoded) {
    return sendError(res, 401, 'Unauthorized - Invalid token');
  }

  req.user = { userId: decoded.userId };
  next();
};
