import { User } from '../models/User.models.js';
import { ConfigRegisterType } from '../config.js';
import jwtService from '../services/jwt.service.js';
import cacheService from '../services/cache.service.js';
import { randomUUID } from 'crypto';
import axios, { AxiosInstance } from 'axios';

interface GoogleUser {
  id: string;
  email: string;
  name: string;
}

class AuthService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create();
  }
  async handleNewUser(user: GoogleUser) {
    try {
      const newUser = await User.create({
        external_id: user.id,
        email: user.email,
        username: user.name,
        register_id: ConfigRegisterType.GOOGLE_AUTH,
      });
      return newUser;
    } catch (err) {
      console.error('Error creating new user:', (err as Error).message);
      throw new Error('Failed to create new user');
    }
  }

  async handleExistingUser(user: GoogleUser) {
    try {
      const existingUser = await User.findOne({
        where: {
          email: user.email,
        },
      });
      if (!existingUser) {
        throw new Error('User not found unexpectedly');
      }
      return existingUser;
    } catch (err) {
      console.error('Error retrieving existing user:', (err as Error).message);
      throw new Error('Failed to retrieve existing user');
    }
  }

  async processGoogleAuth(code: string) {
    try {
      const tokenRes = await this.axiosInstance.post('https://oauth2.googleapis.com/token', null, {
        params: {
          code,
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: `${process.env.BACKEND_URI}:${process.env.PORT}/${process.env.GOOGLE_URL_CALLBACK}`,
          grant_type: 'authorization_code',
        },
      });

      const { access_token } = tokenRes.data;

      const userRes = await this.axiosInstance.get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      const user: GoogleUser = userRes.data;

      const userExists = await User.findOne({ where: { email: user.email } });
      const dbUser = userExists ? await this.handleExistingUser(user) : await this.handleNewUser(user);

      const appToken = jwtService.sign(
        {
          id: dbUser.dataValues.id,
          username: dbUser.dataValues.username,
          email: dbUser.dataValues.email,
        },
        { expiresIn: '1m' }
      );

      const uuid = randomUUID();
      const ttl = 60;
      const success = cacheService.set(uuid, appToken, ttl);

      if (!success) {
        throw new Error('Failed to store UUID in cache');
      }

      return uuid;
    } catch (err) {
      console.error('Google Auth Error:', (err as Error).message || (err as any).response?.data);
      throw err;
    }
  }

  async exchangeUuidForToken(uuid: string) {
    const token: string | undefined = cacheService.get(uuid);
    if (!token) {
      throw new Error('UUID not found or expired');
    }

    const deleted = cacheService.del(uuid);
    if (!deleted) {
      console.warn('Failed to delete UUID from cache:', uuid);
    }

    return token;
  }

  async verifyToken(token: string) {
    try {
      const isValid = jwtService.verifySignatureOnly(token);
      return isValid;
    } catch (error) {
      console.error('Token verification failed:', (error as Error).message);
      throw new Error('Invalid or malformed token');
    }
  }
}

const authService = new AuthService();
export default authService;