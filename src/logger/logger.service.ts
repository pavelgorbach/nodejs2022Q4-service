import * as path from 'path';
import { ConsoleLogger, LogLevel, Injectable } from '@nestjs/common';
import { stat, appendFile } from 'fs/promises';

const LOG_LEVELS: LogLevel[] = ['log', 'error', 'warn', 'debug', 'verbose'];
const LOG_LEVELS_IDX = Number(process.env.LOG_LEVELS_IDX) || 2;
const LOG_FILE_SIZE = Number(process.env.LOG_FILE_SIZE) || 5120;

@Injectable()
export class Logger extends ConsoleLogger {
  private fileVersion = Date.now();

  constructor() {
    super();
    const logLevels = LOG_LEVELS.slice(0, LOG_LEVELS_IDX);
    this.setLogLevels(logLevels);
  }

  log(message: any, context?: string) {
    super.log(message, context);
    this.writeLog('log', message, context);
  }

  error(message: any, context?: string, stack?: string) {
    super.error(message, stack, context);
    this.writeLog('error', message, context, stack);
  }

  warn(message: any, context?: string) {
    super.warn(message, context);
    this.writeLog('warn', message, context);
  }

  debug(message: any, context?: string) {
    super.debug(message, context);
    this.writeLog('debug', message, context);
  }

  verbose(message: any, context?: string) {
    super.verbose(message, context);
    this.writeLog('verbose', message, context);
  }

  private writeLog(level: LogLevel, message: any, context?: any, stack?: any) {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} ${level.toUpperCase()} [${context}] ${message} \n ${
      stack ? stack : ''
    }`;

    process.stdout.write(logMessage);
    this.writeFile(level, logMessage);
  }

  private async writeFile(level: LogLevel, message: any) {
    const filePath = path.join(
      process.cwd(),
      'logs',
      `${this.fileVersion}-${level === 'error' ? 'error' : 'log'}.log`,
    );

    await appendFile(filePath, message + '\n');

    const statFile = await stat(filePath);
    const isOverSize = statFile.size >= LOG_FILE_SIZE;

    if (isOverSize) {
      this.fileVersion = Date.now();
    }
  }
}
