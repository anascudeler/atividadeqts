import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';

import { AppError } from './app-error';
import { ERROR_TYPES } from './error-types';

const INTERNAL_ERROR_MESSAGE = 'Erro interno do servidor.';

function normalizeZodError(error: ZodError): AppError {
    return new AppError({
        error: ERROR_TYPES.VALIDATION_ERROR,
        message: 'Dados de entrada inválidos.',
        details: error.issues.map((issue) => ({
            code: issue.code,
            path: issue.path.join('.'),
            message: issue.message,
        })),

        cause: error,
    });
}

function normalizePrismaError(error: Prisma.PrismaClientKnownRequestError): AppError {
    switch (error.code) {
        case 'P2002':
            return new AppError({
                error: ERROR_TYPES.CONFLICT,
                message: 'Registro duplicado.',
                cause: error,
            });

        case 'P2025':
            return new AppError({
                error: ERROR_TYPES.NOT_FOUND,
                message: 'Registro não encontrado.',
                cause: error,
            });

        default:
            return new AppError({
                error: ERROR_TYPES.INTERNAL_ERROR,
                message: INTERNAL_ERROR_MESSAGE,
                cause: error,
            });
    }
}

export function normalizeError(error: unknown): AppError {
    if (error instanceof AppError) {
        return error;
    }

    if (error instanceof ZodError) {
        return normalizeZodError(error);
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return normalizePrismaError(error);
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
        return new AppError({
            error: ERROR_TYPES.BAD_REQUEST,
            message: 'Consulta inválida.',
            cause: error,
        });
    }

    return new AppError({
        error: ERROR_TYPES.INTERNAL_ERROR,
        message: INTERNAL_ERROR_MESSAGE,
        cause: error,
    });
}
