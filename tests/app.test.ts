import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { app } from '@/app';

describe('GET /health', () => {
    it('deve retornar o status da aplicação', async () => {
        const response = await request(app).get('/health');

        expect(response.status).toBe(200);

        expect(response.body).toMatchObject({
            status: 'UP',
        });

        expect(response.body.timestamp).toBeDefined();
    });
});

describe('Rotas inexistentes', () => {
    it('deve retornar 404 com erro padronizado', async () => {
        const response = await request(app).get('/rota-que-nao-existe');

        expect(response.status).toBe(404);

        expect(response.body).toEqual({
            success: false,
            error: {
                code: 'NOT_FOUND',
                message: 'Rota não encontrada.',
            },
        });
    });
});
