import { Response, NextFunction } from 'express';
import { SearchQueryParams } from '../types/query.type.js';
import { CustomRequest } from '../types/express/index.js';
import authService from '../services/auth.service.js';

export const verifyRequestJWT = async (req: CustomRequest<SearchQueryParams>, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  try {
    if (!token) {
      res.status(403).json({ message: 'No token provided' });
      return;
    }

    const isValid = await authService.verifyToken(token);
    if (isValid) {
      next();
    } else {
      res.status(401).json({ message: 'Invalid token signature' });
    }
  } catch (err) {
    console.error('Controller Error - Verify Token:', (err as Error).message);
    res.status(401).json({ message: (err as Error).message });
  }
};