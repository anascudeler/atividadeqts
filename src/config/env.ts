import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']),

    PORT: z.coerce.number().int().positive(),

    DATABASE_URL: z.string().min(1),

    JWT_SECRET: z.string().min(32),

    JWT_EXPIRES_IN: z.string(),

    JWT_REFRESH_SECRET: z.string().min(32),

    JWT_REFRESH_EXPIRES_IN: z.string(),

    LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']),
});

export const env = envSchema.parse(process.env);
