import type { Request, Response } from 'express';
import { describe, expect, it, vi } from 'vitest';

import { AppError, ERROR_TYPES } from '@/core/errors';
import { errorMiddleware } from '@/core/middleware/error-middleware';

describe('errorMiddleware', () => {
    it('deve transformar um AppError em uma resposta HTTP padronizada', () => {
        const error = new AppError({
            error: ERROR_TYPES.CONFLICT,
            message: 'Registro já existe.',
        });

        const request = {
            method: 'POST',
            originalUrl: '/api/users',
            ip: '127.0.0.1',
        } as Request;

        const response = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn().mockReturnThis(),
        } as unknown as Response;

        const next = vi.fn();

        errorMiddleware(error, request, response, next);

        expect(response.status).toHaveBeenCalledWith(409);

        expect(response.json).toHaveBeenCalledWith({
            success: false,
            error: {
                code: 'CONFLICT',
                message: 'Registro já existe.',
            },
        });
    });

    it('deve transformar um erro desconhecido em erro interno', () => {
        const error = new Error('Erro interno que não deve ser exposto.');

        const request = {
            method: 'GET',
            originalUrl: '/api/test',
            ip: '127.0.0.1',
        } as Request;

        const response = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn().mockReturnThis(),
        } as unknown as Response;

        const next = vi.fn();

        errorMiddleware(error, request, response, next);

        expect(response.status).toHaveBeenCalledWith(500);

        expect(response.json).toHaveBeenCalledWith({
            success: false,
            error: {
                code: 'INTERNAL_ERROR',
                message: 'Erro interno do servidor.',
            },
        });
    });

    it('deve incluir details quando o AppError possuir detalhes', () => {
        const error = new AppError({
            error: ERROR_TYPES.BAD_REQUEST,
            message: 'Dados inválidos.',
            details: {
                field: 'email',
                reason: 'Formato inválido.',
            },
        });

        const request = {
            method: 'POST',
            originalUrl: '/api/users',
            ip: '127.0.0.1',
        } as Request;

        const response = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn().mockReturnThis(),
        } as unknown as Response;

        const next = vi.fn();

        errorMiddleware(error, request, response, next);

        expect(response.status).toHaveBeenCalledWith(400);

        expect(response.json).toHaveBeenCalledWith({
            success: false,
            error: {
                code: 'BAD_REQUEST',
                message: 'Dados inválidos.',
                details: {
                    field: 'email',
                    reason: 'Formato inválido.',
                },
            },
        });
    });
});
