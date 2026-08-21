import type { ErrorRequestHandler, Request } from 'express';

import { normalizeError } from '@/core/errors';
import { logger } from '@/core/logger';

function getRequestContext(request: Request) {
    return {
        method: request.method,
        url: request.originalUrl,
        ip: request.ip,
    };
}

export const errorMiddleware: ErrorRequestHandler = (error, request, response, _next) => {
    const appError = normalizeError(error);

    logger.error(
        {
            err: error,
            code: appError.code,
            statusCode: appError.statusCode,
            request: getRequestContext(request),
            details: appError.details,
        },
        appError.message,
    );

    response.status(appError.statusCode).json({
        success: false,
        error: {
            code: appError.code,
            message: appError.message,
            ...(appError.details !== undefined && {
                details: appError.details,
            }),
        },
    });
};
