import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
      res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Auth-Token');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.status(200).end();
      return;
    }
    next();
  }
}