import { Logger } from './logger.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, query, body } = req;

    res.on('finish', () => {
      const { statusCode } = res;

      const message = `${method},
      url: ${originalUrl},
      status: ${statusCode},
      query: ${JSON.stringify(query)},
      body: ${JSON.stringify(body)}`;

      if (statusCode >= 500) {
        this.logger.error(message, 'HTTP Server Error');
      } else {
        this.logger.log(message, 'HTTP Request');
      }
    });

    next();
  }
}
