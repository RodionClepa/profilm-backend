import { Request, Response } from 'express';
import authService from '../services/auth.service.js';

export const googleAuth = async (req: Request, res: Response) => {
  const { code } = req.query;

  try {
    if (!code) {
      return res.redirect(`${process.env.FRONTEND_URI}?error=no_authorization_code`);
    }

    const uuid = await authService.processGoogleAuth(code as string);
    return res.redirect(
      `${process.env.FRONTEND_URI}/${process.env.FRONTEND_AUTH_SUCCESS_PARAM}?uuid=${uuid}`
    );
  } catch (err) {
    console.error('Controller Error - Google Auth:', (err as Error).message);
    return res.redirect(`${process.env.FRONTEND_URI}?error=oauth`);
  }
};

export const exchangeUuidForToken = async (req: Request, res: Response) => {
  const { uuid } = req.query;

  try {
    if (!uuid || typeof uuid !== 'string') {
      res.status(400).json({ error: 'Invalid or missing UUID' });
      return;
    }

    const token = await authService.exchangeUuidForToken(uuid);
    res.json({ token });
  } catch (err) {
    console.error('Controller Error - Exchange UUID:', (err as Error).message);
    res.status(404).json({ error: (err as Error).message });
  }
};

export const verifyToken = async (req: Request, res: Response) => {
  const token = req.headers['authorization']?.split(' ')[1];

  try {
    if (!token) {
      res.status(403).json({ message: 'No token provided' });
      return;
    }

    const isValid = await authService.verifyToken(token);
    if (isValid) {
      res.status(200).json({ message: 'Token signature is valid' });
    } else {
      res.status(401).json({ message: 'Invalid token signature' });
    }
  } catch (err) {
    console.error('Controller Error - Verify Token:', (err as Error).message);
    res.status(401).json({ message: (err as Error).message });
  }
};