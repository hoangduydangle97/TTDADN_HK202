import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { __JWT_KEY__ } from '../utils/environments';

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = jwt.verify(
      req.headers.authorization as string,
      __JWT_KEY__!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}

  next();
};
