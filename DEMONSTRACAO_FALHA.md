# Demonstração: Como os Testes Detectam Bugs

## Cenário: Simulando um Bug

Vamos simular um desenvolvedor que remove acidentalmente a validação da função `formatMoney`.

### Passo 1: O Código Original (FUNCIONA ✓)

```typescript
export function formatMoney(value: number): string {
    // Validação 1: Verificar se é um número válido
    if (!Number.isFinite(value)) {
        throw new InvalidMoneyValueError(value);
    }

    // Validação 2: Verificar tipo
    if (typeof value !== 'number') {
        throw new InvalidMoneyValueError(value);
    }

    // ... resto da implementação
}
```

**Resultado dos testes:**
```
✓ 11 passed
```

---

### Passo 2: Simulando um Bug (Removendo Validação)

Um desenvolvedor remove a validação para "otimizar":

```typescript
export function formatMoney(value: number): string {
    // Alguém removeu as validações por engano!
    // if (!Number.isFinite(value)) {
    //     throw new InvalidMoneyValueError(value);
    // }
    //
    // if (typeof value !== 'number') {
    //     throw new InvalidMoneyValueError(value);
    // }

    let formatted = formatter.format(Math.abs(value));
    formatted = formatted.replace('\u00A0', ' ');
    return value < 0 ? `R$ -${formatted.replace('R$ ', '')}` : formatted;
}
```

---

### Passo 3: Rodando os Testes (FALHAM ✗)

Comando:
```bash
npm test -- format-money.test.ts
```

**Resultado:**
```
 FAIL  src/utils/format-money.test.ts > formatMoney > quando recebe valores inválidos > deve lançar erro quando recebe NaN
AssertionError: expected error to be thrown but did not

 ❯ src/utils/format-money.test.ts:48:18
    46|         it('deve lançar erro quando recebe NaN', () => {
    47|             expect(() => formatMoney(NaN)).toThrow(
    48|                 InvalidMoneyValueError
    49|             );
    50|         });

Test Files  1 failed (1)
Tests  5 passed | 6 failed (11)
```

---

## Análise: O Que os Testes Nos Ensinaram

### ✗ Testes que Falharam

```
FALHA 1: "deve lançar erro quando recebe NaN"
- Esperado: InvalidMoneyValueError lançado
- Obtido: formatMoney(NaN) retornou "R$ NaN,00" (sem erro!)

FALHA 2: "deve lançar erro quando recebe null"
- Esperado: InvalidMoneyValueError lançado
- Obtido: TypeError ou comportamento inesperado

FALHA 3: "deve lançar erro quando recebe undefined"
- Esperado: InvalidMoneyValueError lançado  
- Obtido: TypeError ou comportamento inesperado

FALHA 4: "deve lançar erro quando recebe string"
- Esperado: InvalidMoneyValueError lançado
- Obtido: Comportamento inesperado

FALHA 5: "deve lançar erro quando recebe Infinity"
- Esperado: InvalidMoneyValueError lançado
- Obtido: "R$ Infinity,00" (sem erro!)

FALHA 6: "deve lançar erro quando recebe -Infinity"
- Esperado: InvalidMoneyValueError lançado
- Obtido: Comportamento inesperado
```

### ✓ Testes que Passaram

Os testes de **valores válidos** ainda passaram porque:
- `formatMoney(100)` → `"R$ 100,00"` ✓ (sem validação, isso ainda funciona)
- `formatMoney(1000)` → `"R$ 1.000,00"` ✓ (sem validação, isso ainda funciona)

**Mas os testes de erro falharam! Exatamente como deveriam!**

---

## Por Que Isso É Importante

### Cenário SEM Testes (Desastre)

```
Semanas depois...

Usuário: "Olá, recebi uma fatura com 'R$ NaN,00' de valor"
Suporte: "Isso é impossível, vou investigar"
Dev: "Alguém removeu as validações da função formatMoney"
CEO: "Quanto custará esse bug?"
Dev: "Vai levar uma semana refazer os testes"
Usuário: "Processarei judicialmente por erro na fatura"
Reputação: 📉 DESTRUÍDA
```

### Cenário COM Testes (Problema Detectado)

```
Desenvolvedor tenta fazer commit:

$ git commit -m "Otimizar formatMoney"
$ npm test

FAIL ✗
Tests 5 passed | 6 failed

Dev: "Ah, os testes falharam. Preciso manter as validações"
Dev: "Entendo agora por que a validação é importante"
Dev: Volta o código para o original
$ npm test
PASS ✓
Tests 11 passed

$ git commit -m "Manter validações no formatMoney"

Result: 🎉 Bug prevenido antes de ir para o código!
```

---

## Lições Importantes

### 1. Testes Detectam Comportamento Quebrado

Os testes **falharam** quando removemos a validação porque:
- Eles testam o **comportamento esperado**
- Removemos o código que implementa esse comportamento
- Os testes **imediatamente reportaram** o problema

### 2. Testes Protegem Contra Regressão

Sem testes:
- Alguém remove as validações
- Código vai para produção
- Usuários veem erros  
- Problema descoberto muito tarde

Com testes:
- Alguém tenta remover as validações
- Testes falham imediatamente
- Pessoa é informada que quebrou algo
- Código não é mergeado (com CI/CD)

### 3. Testes Documentam o Comportamento

Apenas olhando os testes, você sabe:
- A função deve rejeitar NaN
- A função deve rejeitar null
- A função deve rejeitar undefined
- A função deve rejeitar strings
- A função deve rejeitar Infinity

Sem testes, isso seria apenas um comentário (que ninguém lê).

### 4. Testes Estabelecem Contratos

O teste é um **contrato** que diz:
- "Esta função DEVE funcionar assim"
- "Se você mudar isso, o teste vai falhar"
- "Portanto, você saberá imediatamente se quebrou algo"

---

## Estatísticas de Impacto

### Custos de Bugs (Estudos Reais)

| Quando descoberto | Custo relativo |
|:---|:---|
| Durante desenvolvimento | 1x (barato) |
| Depois de código review | 10x |
| Antes de lançamento | 100x |
| **Em produção (usuários)** | **1000x+** |

**Com testes:** Você descobre em desenvolvimento (1x)
**Sem testes:** Você descobre em produção (1000x+)

---

## Como Reproduzir Este Cenário

1. Abra [src/utils/format-money.ts](src/utils/format-money.ts)

2. Remova as linhas de validação:
   ```typescript
   // Comentar ou deletar:
   if (!Number.isFinite(value)) {
       throw new InvalidMoneyValueError(value);
   }

   if (typeof value !== 'number') {
       throw new InvalidMoneyValueError(value);
   }
   ```

3. Rode os testes:
   ```bash
   npm test -- format-money.test.ts
   ```

4. Veja os testes falharem e mostrar exatamente qual problema foi detectado

5. Restaure o código original

6. Rode novamente e veja todos passarem

---

## Conclusão

Este exercício demonstra **por que testes são essenciais**:

✅ **Detectam bugs imediatamente**
✅ **Previnem regressão**
✅ **Documentam comportamento esperado**
✅ **Economizam dinheiro**
✅ **Aumentam confiança no código**
✅ **Facilitam manutenção futura**

**Teste é um investimento que vale muito a pena!**
