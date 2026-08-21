import type { LoggerOptions } from 'pino';

import { env } from '@/config/env';

const developmentOptions: LoggerOptions =
    env.NODE_ENV === 'development'
        ? {
              transport: {
                  target: 'pino-pretty',
                  options: {
                      colorize: true,
                      translateTime: 'HH:MM:ss',
                      ignore: 'pid,hostname',
                  },
              },
          }
        : {};

export const loggerOptions: LoggerOptions = {
    level: env.LOG_LEVEL,

    ...developmentOptions,
};
