import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';

import { Logger } from '../logger/logger.service';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: Logger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    const responseBody = {
      statusCode: status,
      message,
      path: httpAdapter.getRequestUrl(req),
    };

    httpAdapter.reply(res, responseBody, status);

    const loggerMessage = `${req.method},
    url: ${req.originalUrl},
    status: ${status},
    query: ${JSON.stringify(req.query)},
    body: ${JSON.stringify(req.body)}`;

    this.logger.error(loggerMessage, 'CustomExceptionFilter');
  }
}
