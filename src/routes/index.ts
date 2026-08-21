import { Router } from 'express';
import type { Request, Response } from 'express';
import { asyncHandler } from '@/core/middleware/async-handler';
import { AppError, ERROR_TYPES } from '@/core/errors';
import { z } from 'zod';

const routes = Router();

routes.get('/teste', (_request: Request, response: Response) => {
    response.status(200).json({
        message: 'API is running',
    });
});

export { routes };
