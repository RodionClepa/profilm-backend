import { Request } from 'express';

export { }

declare global {
  namespace Express {
    export interface Request {
      validatedQuery?: any;
    }
  }
}

export interface CustomRequest<T = any> extends Request {
  validatedQuery: T;
}