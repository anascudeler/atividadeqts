import express from 'express';

import { AppError, ERROR_TYPES } from '@/core/errors';
import { errorMiddleware } from '@/core/middleware/error-middleware';
import { routes } from '@/routes';

const app = express();

app.use(express.json());

app.get('/health', (_request, response) => {
    response.status(200).json({
        status: 'UP',
        timestamp: new Date().toISOString(),
    });
});

app.use('/api', routes);

/**
 * Middleware para rotas inexistentes.
 * Deve permanecer após todas as rotas.
 */
app.use((_request, _response, next) => {
    next(
        new AppError({
            error: ERROR_TYPES.NOT_FOUND,
            message: 'Rota não encontrada.',
        }),
    );
});

/**
 * Último middleware da aplicação.
 */
app.use(errorMiddleware);

export { app };
