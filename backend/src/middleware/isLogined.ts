import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: number;
}

export const isAuthenticated = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies['short-lived-token'];
  if (!token) {
    return res.status(401).json({ ok: false, error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ ok: false, error: 'Invalid or expired token' });
  }
};
