export class InvalidMoneyValueError extends Error {
    constructor(value: unknown) {
        super(`Valor inválido para formatação de dinheiro: ${value}`);
        this.name = 'InvalidMoneyValueError';
    }
}

export function formatMoney(value: number): string {
    // Validação 1: Verificar se é um número válido
    if (!Number.isFinite(value)) {
        throw new InvalidMoneyValueError(value);
    }

    // Validação 2: Verificar tipo
    if (typeof value !== 'number') {
        throw new InvalidMoneyValueError(value);
    }

    // Determinar se é negativo ANTES de trabalhar com o número
    const isNegative = value < 0;
    const absoluteValue = Math.abs(value);

    // Formatar usando padrão brasileiro:
    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        signDisplay: 'never',
    });

    let formatted = formatter.format(absoluteValue);

    // Remover espaço não-quebrável e substituir por espaço normal
    formatted = formatted.replace('\u00A0', ' ');

    // Recolocar sinal de menos se era negativo
    return isNegative ? `R$ -${formatted.replace('R$ ', '')}` : formatted;
}
