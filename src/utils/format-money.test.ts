import { describe, expect, it } from 'vitest';

import { formatMoney, InvalidMoneyValueError } from '@/utils/format-money';

describe('formatMoney', () => {
    // Testes de SUCESSO - quando funciona corretamente
    describe('quando recebe valores válidos', () => {
        it('deve formatar número inteiro simples', () => {
            const result = formatMoney(100);
            expect(result).toBe('R$ 100,00');
        });

        it('deve formatar número com milhares', () => {
            const result = formatMoney(1000);
            expect(result).toBe('R$ 1.000,00');
        });

        it('deve formatar número com decimais', () => {
            const result = formatMoney(1234.5);
            expect(result).toBe('R$ 1.234,50');
        });

        it('deve formatar zero', () => {
            const result = formatMoney(0);
            expect(result).toBe('R$ 0,00');
        });

        it('deve formatar número negativo', () => {
            const result = formatMoney(-100);
            expect(result).toBe('R$ -100,00');
        });

        it('deve formatar número com muitos decimais (arredondar)', () => {
            const result = formatMoney(123.456);
            expect(result).toBe('R$ 123,46');
        });
    });

    // Testes de FALHA - comportamento diferente do esperado
    describe('quando recebe valores inválidos', () => {
        it('deve lançar erro quando recebe null', () => {
            expect(() => formatMoney(null as any)).toThrow(InvalidMoneyValueError);
        });

        it('deve lançar erro quando recebe undefined', () => {
            expect(() => formatMoney(undefined as any)).toThrow(InvalidMoneyValueError);
        });

        it('deve lançar erro quando recebe NaN', () => {
            expect(() => formatMoney(NaN)).toThrow(InvalidMoneyValueError);
        });

        it('deve lançar erro quando recebe string', () => {
            expect(() => formatMoney('100' as any)).toThrow(InvalidMoneyValueError);
        });

        it('deve lançar erro quando recebe Infinity', () => {
            expect(() => formatMoney(Infinity)).toThrow(InvalidMoneyValueError);
        });
    });
});
