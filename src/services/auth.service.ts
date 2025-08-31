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

  private async exchangeCodeForToken(code: string): Promise<string> {
    try {
      const tokenRes = await this.axiosInstance.post(
        'https://oauth2.googleapis.com/token',
        null,
        {
          params: {
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: `${process.env.BACKEND_URI}:${process.env.PORT}/${process.env.GOOGLE_URL_CALLBACK}`,
            grant_type: 'authorization_code',
          },
        }
      );
      return tokenRes.data.access_token;
    } catch (err) {
      console.error('Failed to exchange code for access token:', (err as any).response?.data || (err as Error).message);
      throw new Error('Google token exchange failed');
    }
  }

  private async fetchGoogleUserInfo(access_token: string): Promise<GoogleUser> {
    try {
      const userRes = await this.axiosInstance.get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      return userRes.data;
    } catch (err) {
      console.error('Failed to fetch user info from Google:', (err as any).response?.data || (err as Error).message);
      throw new Error('Google user info retrieval failed');
    }
  }

  private async getOrCreateUser(user: GoogleUser): Promise<User> {
    try {
      const userExists = await User.findOne({ where: { email: user.email } });
      return userExists ? await this.handleExistingUser(user) : await this.handleNewUser(user);
    } catch (err) {
      console.error('Failed to find or create user in DB:', (err as Error).message);
      throw new Error('User persistence error');
    }
  }

  private async generateAppToken(dbUser: User): Promise<string> {
    try {
      return jwtService.sign(
        {
          id: dbUser.dataValues.id,
          username: dbUser.dataValues.username,
          email: dbUser.dataValues.email,
        },
        { expiresIn: '24h' }
      );
    } catch (err) {
      console.error('Failed to generate JWT token:', (err as Error).message);
      throw new Error('Token generation error');
    }
  }

  private async cacheAppToken(appToken: string): Promise<string> {
    try {
      const uuid = randomUUID();
      const ttl = 60;
      const success = cacheService.set(uuid, appToken, ttl);

      if (!success) {
        console.error('Failed to store UUID/token in cache');
        throw new Error('Token caching error');
      }

      return uuid;
    } catch (err) {
      console.error('Failed to cache app token:', (err as Error).message);
      throw err;
    }
  }

  async processGoogleAuth(code: string) {
    const access_token = await this.exchangeCodeForToken(code);
    const user = await this.fetchGoogleUserInfo(access_token);
    const dbUser = await this.getOrCreateUser(user);
    const appToken = await this.generateAppToken(dbUser);
    return await this.cacheAppToken(appToken);
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