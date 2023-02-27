import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { readFile } from 'fs/promises';
import * as yaml from 'yaml';
import 'dotenv/config';

import { AppModule } from './app.module';
import { Logger } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT') || 4000;

  const logger = app.get(Logger);
  app.useLogger(logger);

  process.on('uncaughtException', (e) => {
    logger.error(`Uncaught Exception: ${e.message}`);
  });

  process.on('unhandledRejection', (reason) => {
    logger.error(`Unhandled Rejection: ${reason}`);
  });

  const apiFile = await readFile('./doc/api.yaml', { encoding: 'utf8' });
  const schema = yaml.parse(apiFile);
  SwaggerModule.setup('doc', app, schema);

  await app.listen(PORT, () => console.log(`Listening on port = ${PORT}`));
}

bootstrap();
