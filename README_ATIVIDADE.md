# 📚 Atividade: Análise, Compreensão e Criação de Testes em API TypeScript

## 🎯 Objetivo

Analisar testes automatizados existentes, compreender como foram estruturados, e criar novos testes demonstrando cenários de sucesso e falha.

---

## 📖 Documentação Disponível

### 🚀 Comece Aqui

1. **[GUIA_NAVEGACAO.md](GUIA_NAVEGACAO.md)** ⭐
   - Qual documento ler
   - Como estrutura a documentação
   - Dicas de navegação
   - **Tempo**: 5 min

### 📊 Análise Completa

2. **[RESUMO_ATIVIDADE.md](RESUMO_ATIVIDADE.md)** 
   - Visão geral da atividade
   - Checklist de aprendizado
   - Estatísticas finais
   - **Tempo**: 10 min

3. **[ANALISE_TESTES.md](ANALISE_TESTES.md)** 📝
   - **Parte 1**: Respostas às 7 questões sobre estrutura
   - **Parte 2**: Análise detalhada de cada teste existente
   - **Tempo**: 30 min

4. **[TESTES_VISUAIS.md](TESTES_VISUAIS.md)** 👁️
   - Visualização de todos os 26 testes
   - Padrões de teste
   - Ciclo completo
   - **Tempo**: 15 min

### 🎓 Criação de Novos Testes

5. **[EXEMPLO_NOVO_TESTE.md](EXEMPLO_NOVO_TESTE.md)** 🎯
   - Como criar nova funcionalidade
   - TDD (Test-Driven Development)
   - Passo a passo prático
   - **Tempo**: 20 min

6. **[DEMONSTRACAO_FALHA.md](DEMONSTRACAO_FALHA.md)** ⚡
   - Como testes detectam bugs
   - Simulação prática
   - Impacto real
   - **Tempo**: 15 min

---

## 🧪 Testes no Projeto

### ✅ Status Atual
```
Test Files  5 passed (5)
Tests  26 passed (26)
```

### 📂 Estrutura de Testes

```
tests/
├── app.test.ts (2 testes)
│   ├─ GET /health
│   └─ Rotas inexistentes (404)
│
├── core/
│   ├── errors/
│   │   ├─ app-error.test.ts (2 testes)
│   │   │  ├─ Criação de erro
│   │   │  └─ Preservação de detalhes
│   │   │
│   │   └─ error-normalizer.test.ts (8 testes)
│   │      ├─ P2002 → CONFLICT
│   │      ├─ P2025 → NOT_FOUND
│   │      ├─ P2000 → INTERNAL_ERROR
│   │      ├─ Validation → BAD_REQUEST
│   │      ├─ AppError pass-through
│   │      ├─ ZodError → VALIDATION_ERROR
│   │      ├─ Error genérico
│   │      └─ Não-Error value
│   │
│   └── middleware/
│       └─ error-middleware.test.ts (3 testes)
│          ├─ AppError → HTTP response
│          ├─ Erro desconhecido
│          └─ Com details
│
└─ 🆕 utils/
    └─ format-money.test.ts (11 testes)
       ├─ 6 testes de SUCESSO
       └─ 5 testes de FALHA
```

---

## 🚀 Começar

### Opção 1: Aprender Tudo (Recomendado)
```
1. Ler GUIA_NAVEGACAO.md
2. Ler ANALISE_TESTES.md
3. Ler EXEMPLO_NOVO_TESTE.md
4. Executar: npm test
5. Explorar código dos testes
```

### Opção 2: Responder Questões Rápido
```
1. Ir para ANALISE_TESTES.md
2. Procurar por "Parte 1" e "Parte 2"
3. Copiar respostas
```

### Opção 3: Ver na Prática
```
1. Executar: npm test
2. Ler TESTES_VISUAIS.md
3. Abrir EXEMPLO_NOVO_TESTE.md
4. Modificar código e rodar testes
```

---

## 📊 Questões Respondidas

### Parte 1: Estrutura dos Testes

1. ✅ Qual framework?
   - **Vitest**

2. ✅ Qual finalidade?
   - **Automação de validação de comportamento**

3. ✅ Como organizar?
   - **describe() + it()**

4. ✅ Como executar?
   - **Chamada direta / supertest / mocks**

5. ✅ Como determinar resultado?
   - **expect() com matchers**

6. ✅ Como comparar?
   - **Assertions verificam resultado**

7. ✅ Por que importante?
   - **Detecção automática de bugs**

### Parte 2: Análise de Testes Existentes

- ✅ [tests/app.test.ts](tests/app.test.ts) - 2 testes analisados
- ✅ [tests/core/errors/app-error.test.ts](tests/core/errors/app-error.test.ts) - 2 testes analisados
- ✅ [tests/core/errors/error-normalizer.test.ts](tests/core/errors/error-normalizer.test.ts) - 8 testes analisados
- ✅ [tests/core/middleware/error-middleware.test.ts](tests/core/middleware/error-middleware.test.ts) - 3 testes analisados

### Parte 3: Nova Funcionalidade

- ✅ Funcionalidade criada: `formatMoney()`
- ✅ 11 testes criados (6 sucesso + 5 falha)
- ✅ Demonstração de falha funcionando

---

## 💻 Comandos Úteis

### Executar Todos os Testes
```bash
npm test
```

### Apenas Teste de Nova Funcionalidade
```bash
npm test -- format-money.test.ts
```

### Com Coverage (Cobertura)
```bash
npm test -- --coverage
```

### Watch Mode (Rodar ao salvar)
```bash
npm test -- --watch
```

---

## 🎯 Conhecimentos Trabalhados

✅ Testes automatizados
✅ Estrutura de arquivo de teste
✅ Organização dos testes
✅ Preparação de dados
✅ Execução de função
✅ Comparação esperado vs obtido
✅ Testes de sucesso
✅ Testes de falha
✅ Interpretação de resultados
✅ Identificação de causa
✅ Importância para manutenção
✅ TDD (Test-Driven Development)

---

## 📈 Progressão de Aprendizado

```
Dia 1: Entender estrutura (30 min)
├─ Ler ANALISE_TESTES.md Parte 1
├─ Rodar npm test
└─ Explorar código

Dia 2: Analisar testes (45 min)
├─ Ler ANALISE_TESTES.md Parte 2
├─ Abrir cada arquivo de teste
└─ Entender cada assertion

Dia 3: Criar funcionalidade (1h)
├─ Ler EXEMPLO_NOVO_TESTE.md
├─ Abrir format-money.test.ts
└─ Entender TDD

Dia 4: Praticar (1h+)
├─ Modificar código propositalmente
├─ Ver testes falharem
├─ Restaurar código
└─ Criar sua própria funcionalidade
```

---

## 🎬 Demonstração Prática

### 1. Ver Testes Passando
```bash
$ npm test
Test Files  5 passed (5)
Tests  26 passed (26)
```

### 2. Quebrar Código (opcional)
```bash
# Editar src/utils/format-money.ts
# Remover validações
$ npm test -- format-money.test.ts
Tests  6 failed | 5 passed (11)
```

### 3. Ver Testes Detectando
```
✗ deve lançar erro quando recebe NaN
  → expected function to throw an error, but it didn't
✗ deve lançar erro quando recebe null
  → expected function to throw an error, but it didn't
... (mais 4 falhas)
```

### 4. Restaurar Código
```bash
# Restaurar src/utils/format-money.ts
$ npm test
Test Files  5 passed (5)
Tests  26 passed (26)
```

---

## 📚 Estrutura de Documentos

```
📄 Documentação
├── README_ATIVIDADE.md (este arquivo)
├── GUIA_NAVEGACAO.md (como navegar)
├── RESUMO_ATIVIDADE.md (visão geral)
├── ANALISE_TESTES.md (análise completa)
├── TESTES_VISUAIS.md (visualização)
├── EXEMPLO_NOVO_TESTE.md (como criar)
└── DEMONSTRACAO_FALHA.md (demonstração)

💻 Código
├── tests/
│   ├── app.test.ts
│   └── core/
│       ├── errors/
│       │   ├── app-error.test.ts
│       │   └── error-normalizer.test.ts
│       └── middleware/
│           └── error-middleware.test.ts
└── src/
    └── utils/
        ├── format-money.ts (NOVO)
        └── format-money.test.ts (NOVO)
```

---

## ✨ Próximos Passos

1. **Leia [GUIA_NAVEGACAO.md](GUIA_NAVEGACAO.md)** (5 min)
2. **Escolha seu caminho** (aprender / rápido / praticar)
3. **Explore a documentação** conforme seu ritmo
4. **Rode `npm test`** e veja na prática
5. **Crie sua própria funcionalidade** com testes

---

## 🎓 Conclusão

Você tem agora:
- ✅ Entendimento completo de testes
- ✅ 26 testes funcionando
- ✅ Documentação detalhada
- ✅ Exemplo prático (formatMoney)
- ✅ Confiança para criar novos testes

**Status**: ✅ COMPLETO

**Próximo desafio**: Aplicar em seus próprios projetos! 🚀

---

## 📞 Recursos

- [Documentação Vitest](https://vitest.dev/)
- [TDD (Test-Driven Development)](https://en.wikipedia.org/wiki/Test-driven_development)
- [Testes Automatizados - Importância](https://martinfowler.com/bliki/TestCoverage.html)

---

**Versão**: 1.0
**Última atualização**: 2026-08-21
**Status**: ✅ Completo
