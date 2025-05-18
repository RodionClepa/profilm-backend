import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { generateKeyPairSync, verify as cryptoVerify } from 'crypto';
import { fileURLToPath } from 'url';

interface JwtPayload {
  [key: string]: any;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class JwtService {
  private privateKey: string;
  private publicKey: string;
  private privateKeyPath: string = path.join(__dirname, '..', 'keys', 'private.key');
  private publicKeyPath: string = path.join(__dirname, '..', 'keys', 'public.pem');

  constructor() {
    const keysDir = path.join(__dirname, '..', 'keys');
    try {
      if (!fs.existsSync(keysDir)) {
        fs.mkdirSync(keysDir, { recursive: true });
      }

      if (!fs.existsSync(this.privateKeyPath) || !fs.existsSync(this.publicKeyPath)) {
        this.generateKeys();
      }

      this.privateKey = fs.readFileSync(this.privateKeyPath, 'utf8');
      this.publicKey = fs.readFileSync(this.publicKeyPath, 'utf8');
    } catch (error) {
      throw new Error(`Failed to initialize keys: ${error.message}`);
    }
  }

  private generateKeys(): void {
    try {
      const { publicKey, privateKey } = generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
        },
      });

      fs.writeFileSync(this.privateKeyPath, privateKey);
      fs.writeFileSync(this.publicKeyPath, publicKey);
    } catch (error) {
      throw new Error(`Failed to generate keys: ${error.message}`);
    }
  }

  sign(payload: JwtPayload, options?: jwt.SignOptions): string {
    try {
      return jwt.sign(payload, this.privateKey, {
        algorithm: 'RS256',
        ...options,
      });
    } catch (error) {
      throw new Error(`Failed to sign token: ${error.message}`);
    }
  }

  verify(token: string, options?: jwt.VerifyOptions): JwtPayload {
    try {
      return jwt.verify(token, this.publicKey, {
        algorithms: ['RS256'],
        ...options,
      }) as JwtPayload;
    } catch (error) {
      throw new Error(`Invalid token: ${error.message}`);
    }
  }

  decode(token: string): JwtPayload | null {
    try {
      return jwt.decode(token) as JwtPayload | null;
    } catch (error) {
      throw new Error(`Failed to decode token: ${error.message}`);
    }
  }

  public verifySignatureOnly(token: string): boolean {
    try {
      const parts: string[] = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
      }

      const [header, payload, signature] = parts;
      const data = `${header}.${payload}`;

      const signatureBuffer = Buffer.from(signature, 'base64url');

      const isValid = cryptoVerify(
        'sha256',
        Buffer.from(data),
        this.publicKey,
        signatureBuffer
      );

      return isValid;
    } catch (error) {
      throw new Error(`Signature verification failed: ${(error as Error).message}`);
    }
  }
}

const jwtService = new JwtService();
export default jwtService;