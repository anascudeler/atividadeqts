# 🧪 Visualização de Todos os Testes

## Resumo Visual

```
📊 TOTAL: 26 Testes em 5 Arquivos

┌────────────────────────────────────────────────────┐
│ ✅ 26 PASSANDO  |  ❌ 0 FALHANDO  |  ⏱️ ~230ms       │
└────────────────────────────────────────────────────┘
```

---

## Testes Originais (15 Testes)

### 1️⃣ GET /health (2 testes)
**Arquivo**: [tests/app.test.ts](tests/app.test.ts)

```
✓ deve retornar o status da aplicação
  → Status esperado: 200 OK
  → Resposta: { status: 'UP', timestamp: '...' }

✓ Rotas inexistentes devem retornar 404
  → Status esperado: 404 NOT_FOUND
  → Resposta padronizada com erro
```

---

### 2️⃣ AppError - Classe (2 testes)
**Arquivo**: [tests/core/errors/app-error.test.ts](tests/core/errors/app-error.test.ts)

```
✓ deve criar um erro com código e status corretos
  → Tipo: AppError
  → Code: CONFLICT
  → StatusCode: 409

✓ deve preservar detalhes adicionais
  → Details: { field: 'email', value: '...' }
  → Informações extras preservadas
```

---

### 3️⃣ Normalização de Erros (8 testes)
**Arquivo**: [tests/core/errors/error-normalizer.test.ts](tests/core/errors/error-normalizer.test.ts)

```
✓ P2002 (Unique Constraint) → CONFLICT (409)
  Entrada: Erro Prisma "P2002"
  Saída: AppError com code CONFLICT

✓ P2025 (Record Not Found) → NOT_FOUND (404)
  Entrada: Erro Prisma "P2025"
  Saída: AppError com code NOT_FOUND

✓ Código Prisma desconhecido → INTERNAL_ERROR (500)
  Entrada: Erro Prisma "P2000" (não mapeado)
  Saída: AppError genérico

✓ PrismaClientValidationError → BAD_REQUEST (400)
  Entrada: Erro de validação Prisma
  Saída: AppError com status 400

✓ AppError recebido → sem transformação
  Entrada: AppError já transformado
  Saída: Mesmo objeto (identidade)

✓ ZodError → VALIDATION_ERROR (400)
  Entrada: Erro de validação Zod
  Saída: AppError com detalhes dos erros

✓ Erro genérico → INTERNAL_ERROR (500)
  Entrada: new Error('...')
  Saída: AppError genérico (mensagem escondida)

✓ Valor não-Error → INTERNAL_ERROR (500)
  Entrada: string ou número (throw 'erro')
  Saída: AppError genérico
```

---

### 4️⃣ Middleware de Erro (3 testes)
**Arquivo**: [tests/core/middleware/error-middleware.test.ts](tests/core/middleware/error-middleware.test.ts)

```
✓ AppError → Resposta HTTP padronizada
  Entrada: AppError(CONFLICT, 'Registro já existe')
  Saída: HTTP 409 + JSON com erro

✓ Erro desconhecido → Erro genérico
  Entrada: new Error('Erro interno...')
  Saída: HTTP 500 + Mensagem genérica (seguro!)

✓ Com detalhes → Incluir details na resposta
  Entrada: AppError com details
  Saída: HTTP 400 + details inclusos
```

---

## 🆕 Testes Novos (11 Testes)

### 5️⃣ formatMoney - Funcionalidade Prática (11 testes)
**Arquivo**: [src/utils/format-money.test.ts](src/utils/format-money.test.ts)

#### ✓ Testes de SUCESSO (6 testes)

```
✓ Número inteiro simples
  Input:  formatMoney(100)
  Output: "R$ 100,00" ✓

✓ Número com milhares
  Input:  formatMoney(1000)
  Output: "R$ 1.000,00" ✓

✓ Número com decimais
  Input:  formatMoney(1234.5)
  Output: "R$ 1.234,50" ✓

✓ Zero
  Input:  formatMoney(0)
  Output: "R$ 0,00" ✓

✓ Número negativo
  Input:  formatMoney(-100)
  Output: "R$ -100,00" ✓

✓ Arredondamento (muitos decimais)
  Input:  formatMoney(123.456)
  Output: "R$ 123,46" ✓
```

#### ✗ Testes de FALHA (5 testes)

```
✗ null → throw InvalidMoneyValueError
  Input:  formatMoney(null)
  Output: Lançar erro ✗

✗ undefined → throw InvalidMoneyValueError
  Input:  formatMoney(undefined)
  Output: Lançar erro ✗

✗ NaN → throw InvalidMoneyValueError
  Input:  formatMoney(NaN)
  Output: Lançar erro ✗

✗ string → throw InvalidMoneyValueError
  Input:  formatMoney('100')
  Output: Lançar erro ✗

✗ Infinity → throw InvalidMoneyValueError
  Input:  formatMoney(Infinity)
  Output: Lançar erro ✗
```

---

## 🔄 Ciclo Completo de Testes

### Fase 1: Implementação ✓
```
Código correto com validações
         ↓
    npm test
         ↓
26 PASSED ✓✓✓
```

### Fase 2: Quebra Intencional ✗
```
Removeu validações de formatMoney
         ↓
    npm test
         ↓
6 FAILED ✗✗✗
(Detectou os erros!)
```

### Fase 3: Restauração ✓
```
Restaurou as validações
         ↓
    npm test
         ↓
26 PASSED ✓✓✓
(Tudo ok novamente!)
```

---

## 📈 Progressão de Testes

```
Semana 1: Testes Originais (15 testes)
┌─────────────────────────┐
│ app.test.ts           2 │ (Health, 404)
│ app-error.test.ts     2 │ (Erro simples)
│ error-normalizer      8 │ (Transformação)
│ error-middleware      3 │ (Middleware)
└─────────────────────────┘
       Total: 15 ✓

Semana 2: Nova Funcionalidade (11 testes)
┌─────────────────────────┐
│ format-money.test.ts 11 │ (Sucesso + Falha)
│   • 6 de SUCESSO        │
│   • 5 de FALHA          │
└─────────────────────────┘
       Total: 11 ✓

TOTAL: 26 ✓
```

---

## 💡 Padrões de Teste

### Padrão 1: Teste de Sucesso
```typescript
it('deve formatar número inteiro simples', () => {
    const result = formatMoney(100);
    expect(result).toBe('R$ 100,00');
});
```
**Tipo**: Valor correto → Resultado esperado

### Padrão 2: Teste de Falha
```typescript
it('deve lançar erro quando recebe NaN', () => {
    expect(() => formatMoney(NaN)).toThrow(InvalidMoneyValueError);
});
```
**Tipo**: Valor inválido → Erro esperado

### Padrão 3: Teste de Transformação
```typescript
it('deve transformar P2002 em erro de conflito', () => {
    const normalizedError = normalizeError(prismaError);
    expect(normalizedError.code).toBe('CONFLICT');
    expect(normalizedError.statusCode).toBe(409);
});
```
**Tipo**: Entrada transformada → Saída consistente

### Padrão 4: Teste de API
```typescript
it('deve retornar o status da aplicação', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
});
```
**Tipo**: Requisição HTTP → Resposta esperada

---

## 📊 Cobertura de Cenários

```
formatMoney (11 testes)
│
├─ SUCESSO (valores válidos) - 6 testes
│  ├─ Inteiro simples
│  ├─ Com milhares
│  ├─ Com decimais
│  ├─ Zero
│  ├─ Negativo
│  └─ Arredondamento
│
└─ FALHA (valores inválidos) - 5 testes
   ├─ null
   ├─ undefined
   ├─ NaN
   ├─ string
   └─ Infinity

errorNormalizer (8 testes)
│
├─ Prisma P2002 → CONFLICT
├─ Prisma P2025 → NOT_FOUND
├─ Prisma desconhecido → INTERNAL_ERROR
├─ Prisma Validation → BAD_REQUEST
├─ AppError (pass-through)
├─ Zod Error → VALIDATION_ERROR
├─ Erro genérico → INTERNAL_ERROR
└─ Não-Error → INTERNAL_ERROR
```

---

## ✨ Checklist de Execução

- [x] Teste de API funciona
- [x] Teste de classe funciona
- [x] Teste de normalização funciona
- [x] Teste de middleware funciona
- [x] Teste de sucesso funciona
- [x] Teste de falha funciona
- [x] Testes detectam bugs
- [x] Testes protegem contra regressão
- [x] 26/26 testes passando

**Status**: ✅ COMPLETO
