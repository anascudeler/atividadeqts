import { Prisma } from '@prisma/client';
import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { AppError, ERROR_TYPES, normalizeError } from '@/core/errors';

describe('normalizeError', () => {
    it('deve transformar P2002 em erro de conflito', () => {
        const prismaError = new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
            code: 'P2002',
            clientVersion: '6.19.3',
        });

        const normalizedError = normalizeError(prismaError);

        expect(normalizedError).toBeInstanceOf(AppError);
        expect(normalizedError.code).toBe('CONFLICT');
        expect(normalizedError.statusCode).toBe(409);
        expect(normalizedError.message).toBe('Registro duplicado.');
    });

    it('deve transformar P2025 em erro de recurso não encontrado', () => {
        const prismaError = new Prisma.PrismaClientKnownRequestError(
            'Record to delete does not exist',
            {
                code: 'P2025',
                clientVersion: '6.19.3',
            },
        );

        const normalizedError = normalizeError(prismaError);

        expect(normalizedError).toBeInstanceOf(AppError);
        expect(normalizedError.code).toBe('NOT_FOUND');
        expect(normalizedError.statusCode).toBe(404);
        expect(normalizedError.message).toBe('Registro não encontrado.');
    });

    it('deve transformar um código Prisma desconhecido em erro interno', () => {
        const prismaError = new Prisma.PrismaClientKnownRequestError(
            'Erro conhecido do Prisma não tratado pela aplicação',
            {
                code: 'P2000',
                clientVersion: '6.19.3',
            },
        );

        const normalizedError = normalizeError(prismaError);

        expect(normalizedError).toBeInstanceOf(AppError);
        expect(normalizedError.code).toBe('INTERNAL_ERROR');
        expect(normalizedError.statusCode).toBe(500);
        expect(normalizedError.message).toBe('Erro interno do servidor.');
    });

    it('deve transformar PrismaClientValidationError em BAD_REQUEST', () => {
        const prismaError = new Prisma.PrismaClientValidationError('Invalid Prisma query.', {
            clientVersion: '6.19.3',
        });

        const normalizedError = normalizeError(prismaError);

        expect(normalizedError).toBeInstanceOf(AppError);
        expect(normalizedError.code).toBe('BAD_REQUEST');
        expect(normalizedError.statusCode).toBe(400);
        expect(normalizedError.message).toBe('Consulta inválida.');
    });

    it('deve retornar o próprio AppError quando receber um AppError', () => {
        const originalError = new AppError({
            error: ERROR_TYPES.CONFLICT,
            message: 'Registro já existe.',
        });

        const normalizedError = normalizeError(originalError);

        expect(normalizedError).toBe(originalError);
    });

    it('deve transformar um ZodError em AppError de validação', () => {
        const schema = z.object({
            name: z.string().min(3),
        });

        const result = schema.safeParse({
            name: 'AB',
        });

        expect(result.success).toBe(false);

        if (result.success) {
            throw new Error('O teste deveria produzir um erro de validação.');
        }

        const normalizedError = normalizeError(result.error);

        expect(normalizedError).toBeInstanceOf(AppError);
        expect(normalizedError.code).toBe('VALIDATION_ERROR');
        expect(normalizedError.statusCode).toBe(400);

        expect(normalizedError.details).toMatchObject([
            {
                code: 'too_small',
                path: 'name',
            },
        ]);

        expect((normalizedError.details as Array<{ message: string }>)[0]?.message).toBeDefined();
    });

    it('deve transformar um erro desconhecido em erro interno', () => {
        const originalError = new Error('Erro inesperado.');

        const normalizedError = normalizeError(originalError);

        expect(normalizedError).toBeInstanceOf(AppError);
        expect(normalizedError.code).toBe('INTERNAL_ERROR');
        expect(normalizedError.statusCode).toBe(500);
        expect(normalizedError.message).toBe('Erro interno do servidor.');
    });

    it('deve transformar valores que não são Error em erro interno', () => {
        const normalizedError = normalizeError('erro inesperado');

        expect(normalizedError).toBeInstanceOf(AppError);
        expect(normalizedError.code).toBe('INTERNAL_ERROR');
        expect(normalizedError.statusCode).toBe(500);
    });
});
