import pino from 'pino';

import { loggerOptions } from './options';

export const logger = pino(loggerOptions);
