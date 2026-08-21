# Exemplo Prático: Criando Nova Funcionalidade com Testes

## Situação

Vamos criar uma nova funcionalidade simples para a API: um utilitário que **formata valores monetários** (em reais).

Essa funcionalidade será simples o suficiente para ser testada, mas realista.

---

## Passo 1: Entender o Comportamento Esperado

Antes de escrever qualquer código, precisamos definir claramente qual é o comportamento esperado:

**Funcionalidade**: `formatMoney(value: number): string`

**Cenários esperados:**
1. ✓ Formatar 100 como "R$ 100,00"
2. ✓ Formatar 1000 como "R$ 1.000,00"
3. ✓ Formatar 1234.5 como "R$ 1.234,50"
4. ✓ Formatar 0 como "R$ 0,00"
5. ✓ Formatar número negativo como "R$ -100,00"

**Cenários de erro esperados:**
1. ✗ Quando recebe `null` → deve lançar erro
2. ✗ Quando recebe `undefined` → deve lançar erro
3. ✗ Quando recebe `NaN` → deve lançar erro
4. ✗ Quando recebe string → deve lançar erro

---

## Passo 2: Escrever os Testes ANTES do Código (TDD)

Vamos criar o arquivo de teste primeiro:

```typescript
// src/utils/format-money.test.ts

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
            expect(() => formatMoney(null as any)).toThrow(
                InvalidMoneyValueError
            );
        });

        it('deve lançar erro quando recebe undefined', () => {
            expect(() => formatMoney(undefined as any)).toThrow(
                InvalidMoneyValueError
            );
        });

        it('deve lançar erro quando recebe NaN', () => {
            expect(() => formatMoney(NaN)).toThrow(
                InvalidMoneyValueError
            );
        });

        it('deve lançar erro quando recebe string', () => {
            expect(() => formatMoney('100' as any)).toThrow(
                InvalidMoneyValueError
            );
        });

        it('deve lançar erro quando recebe Infinity', () => {
            expect(() => formatMoney(Infinity)).toThrow(
                InvalidMoneyValueError
            );
        });
    });
});
```

**O que notamos aqui:**

✓ **Testes de sucesso** (`describe('quando recebe valores válidos')`):
  - Testam cenários onde tudo funciona como esperado
  - Verificam que o valor formatado está exatamente como esperado
  - Cobrem casos comuns: inteiro, milhares, decimais, zero, negativo

✗ **Testes de falha** (`describe('quando recebe valores inválidos')`):
  - Testam cenários onde a função deve rejeitar a entrada
  - Usam `expect(() => formatMoney(...)).toThrow(Error)` 
  - Garantem que erros inválidos são detectados

---

## Passo 3: Rodar os Testes (Eles Falham!)

Neste ponto, se você rodar:
```bash
npm test -- format-money.test.ts
```

Vai dar erro porque o arquivo `format-money.ts` não existe ainda. **Isso é esperado e normal!**

Mensagem de erro:
```
Error: Cannot find module '@/utils/format-money'
```

**Filosofia TDD**: Escreva o teste ANTES de implementar. O teste falha inicialmente.

---

## Passo 4: Implementar a Funcionalidade

Agora implementamos o código para passar nos testes:

```typescript
// src/utils/format-money.ts

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

    // Formatar:
    // 1. Arredondar para 2 casas decimais
    // 2. Converter para string com locale brasileiro
    // 3. Adicionar prefixo "R$ "
    
    const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);

    return formatted;
}
```

**O que faz:**
1. Valida se é um número finito (`Number.isFinite()` rejeita `NaN` e `Infinity`)
2. Verifica o tipo (rejeita strings)
3. Usa `Intl.NumberFormat` para formatar de acordo com padrão brasileiro
4. Retorna string formatada como "R$ 100,00"

---

## Passo 5: Rodar os Testes Novamente

Agora quando você roda:
```bash
npm test -- format-money.test.ts
```

Todos os testes devem passar! ✓

```
 PASS  src/utils/format-money.test.ts
  formatMoney
    quando recebe valores válidos
      ✓ deve formatar número inteiro simples
      ✓ deve formatar número com milhares
      ✓ deve formatar número com decimais
      ✓ deve formatar zero
      ✓ deve formatar número negativo
      ✓ deve formatar número com muitos decimais (arredondar)
    quando recebe valores inválidos
      ✓ deve lançar erro quando recebe null
      ✓ deve lançar erro quando recebe undefined
      ✓ deve lançar erro quando recebe NaN
      ✓ deve lançar erro quando recebe string
      ✓ deve lançar erro quando recebe Infinity

  Test Files  1 passed (1)
  Tests  11 passed (11)
```

---

## Passo 6: Demonstrar um Teste Falhando

Agora vamos demonstrar **o que acontece quando um teste falha**.

Vamos simular um cenário onde alguém muda o código de forma incorreta:

**Código modificado (ERRADO):**
```typescript
export function formatMoney(value: number): string {
    // Alguém removeu a validação por engano!
    // if (!Number.isFinite(value)) {
    //     throw new InvalidMoneyValueError(value);
    // }

    const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);

    return formatted;
}
```

**O que acontece ao rodar os testes:**

```
 FAIL  src/utils/format-money.test.ts
  formatMoney
    quando recebe valores válidos
      ✓ deve formatar número inteiro simples
      ✓ deve formatar número com milhares
      ✓ deve formatar número com decimais
      ✓ deve formatar zero
      ✓ deve formatar número negativo
      ✓ deve formatar número com muitos decimais (arredondar)
    quando recebe valores inválidos
      ✗ deve lançar erro quando recebe NaN

  Error: expected error to be thrown but did not
    at formatMoney.test.ts:55:18

      54 |        it('deve lançar erro quando recebe NaN', () => {
      55 |            expect(() => formatMoney(NaN)).toThrow(
      56 |                InvalidMoneyValueError
      57 |            );
      58 |        });
```

**O que o teste nos diz:**
1. **O teste que falhou**: "deve lançar erro quando recebe NaN"
2. **O que esperava**: Uma exceção `InvalidMoneyValueError`
3. **O que aconteceu**: A função não lançou erro
4. **Localização**: arquivo `formatMoney.test.ts`, linha 55

**Isso é EXATAMENTE o ponto!** O teste detectou imediatamente que alguém removeu a validação.

---

## Passo 7: Entender a Importância

Vamos explorar por que esse teste é importante:

### Cenário SEM testes:

```javascript
// Código original funciona
console.log(formatMoney(100));  // "R$ 100,00" ✓

// Alguém muda o código removendo validação
// (removeu por engano ou por achar que não era necessário)

// Você testa manualmente alguns valores
console.log(formatMoney(100));  // "R$ 100,00" ✓ - parece ok!
console.log(formatMoney(1000)); // "R$ 1.000,00" ✓ - parece ok!

// Mas não testa NaN (quem testa isso normalmente?)
// Semanas depois, um bug aparece em produção
formatMoney(NaN)  // Retorna "R$ NaN,00" - PROBLEMA!

// Clientes recebem valores quebrados
// Você só descobre quando clientes reclamam
```

### Cenário COM testes:

```bash
# Alguém muda o código
$ npm test

# FALHA IMEDIATA
✗ deve lançar erro quando recebe NaN
  Error: expected error to be thrown but did not

# Você descobre o problema IMEDIATAMENTE
# Antes do código chegar a produção
# Antes de clientes verem qualquer problema
```

**Diferença crítica:**
- ❌ Sem testes: Bug descoberto em produção (muito caro, reputação prejudicada)
- ✅ Com testes: Bug descoberto antes de fazer commit (barato, grátis)

---

## Resumo do Aprendizado

### ✓ O que os testes nos ensinam:

1. **Especificação clara**: Os testes definem exatamente o que a função deve fazer
2. **Casos de sucesso**: Como `formatMoney(100)` deve retornar `"R$ 100,00"`
3. **Casos de falha**: Como `formatMoney(NaN)` deve lançar erro
4. **Proteção contra regressão**: Mudanças futuras não podem quebrar esses comportamentos
5. **Documentação viva**: Alguém novo no projeto pode ler os testes e entender como usar

### ✗ O que acontece sem testes:

1. Você confia que testou manualmente (memória falha)
2. Casos raros (NaN, Infinity) são esquecidos
3. Mudanças futuras podem quebrar tudo
4. Bugs só aparecem em produção
5. Manutenção fica cara e arriscada

### 🎯 A Filosofia TDD:

1. **Escrever o teste PRIMEIRO** (ele falha)
2. **Implementar o código** para passar
3. **Verificar que passa**
4. **Refatorar com confiança** (testes garantem que não quebrou)

---

## Como Usar Este Exemplo

Para testar isso na prática:

1. Copie o arquivo de teste para `src/utils/format-money.test.ts`
2. Copie a implementação para `src/utils/format-money.ts`
3. Rode `npm test -- format-money.test.ts`
4. Veja todos os 11 testes passarem ✓
5. Comente a linha de validação na implementação
6. Rode `npm test` novamente
7. Observe os testes falharem e mostrar exatamente qual problema foi detectado

---

## Próximos Passos

Para aprofundar seus conhecimentos:

1. Crie uma nova funcionalidade pequena
2. Escreva os testes ANTES do código
3. Implemente a funcionalidade
4. Veja os testes passarem
5. Mude o código propositalmente
6. Observe os testes falharem e detectarem o problema

Isso é TDD (Test-Driven Development) na prática!
