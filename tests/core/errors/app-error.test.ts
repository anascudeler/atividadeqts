import { describe, expect, it } from 'vitest';

import { AppError, ERROR_TYPES } from '@/core/errors';

describe('AppError', () => {
    it('deve criar um erro de aplicação com código e status corretos', () => {
        const error = new AppError({
            error: ERROR_TYPES.CONFLICT,
            message: 'Registro já existe.',
        });

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(AppError);

        expect(error.name).toBe('AppError');
        expect(error.message).toBe('Registro já existe.');
        expect(error.code).toBe('CONFLICT');
        expect(error.statusCode).toBe(409);
    });

    it('deve preservar os detalhes adicionais do erro', () => {
        const details = {
            field: 'email',
            value: 'usuario@fg.local',
        };

        const error = new AppError({
            error: ERROR_TYPES.CONFLICT,
            message: 'Registro já existe.',
            details,
        });

        expect(error.details).toEqual(details);
    });
});
