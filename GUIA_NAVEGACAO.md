# 📚 Guia de Navegação: Todos os Documentos da Atividade

## Estrutura de Documentação

```
atividadeqts/
├── RESUMO_ATIVIDADE.md ⭐ (COMECE AQUI!)
│   └─ Visão geral completa, checklist, estatísticas
│
├── ANALISE_TESTES.md 📊
│   ├─ Parte 1: Respostas às 7 questões sobre estrutura
│   └─ Parte 2: Análise detalhada de cada teste existente
│
├── EXEMPLO_NOVO_TESTE.md 🎯
│   ├─ Como criar nova funcionalidade com testes
│   ├─ Exemplo prático: formatMoney
│   └─ TDD (Test-Driven Development)
│
└── DEMONSTRACAO_FALHA.md ⚡
    ├─ Como testes detectam bugs
    ├─ Simulação de quebra de código
    └─ Impacto de bugs em produção
```

---

## 📄 Qual Documento Ler?

### 🎓 Se você quer APRENDER TUDO
**→ Leia nesta ordem:**

1. **[RESUMO_ATIVIDADE.md](RESUMO_ATIVIDADE.md)**
   - Visão geral rápida
   - Checklist de aprendizado
   - Conhecimentos trabalhados
   - **Tempo**: 5-10 minutos

2. **[ANALISE_TESTES.md](ANALISE_TESTES.md)**
   - Respostas detalhadas às questões
   - Análise de cada teste existente
   - Entender por que cada teste existe
   - **Tempo**: 20-30 minutos

3. **[EXEMPLO_NOVO_TESTE.md](EXEMPLO_NOVO_TESTE.md)**
   - Entender TDD na prática
   - Passo a passo de criação de funcionalidade
   - Quando testes passam e quando falharam
   - **Tempo**: 15-20 minutos

4. **[DEMONSTRACAO_FALHA.md](DEMONSTRACAO_FALHA.md)**
   - Demonstração prática de falha
   - Impacto real dos testes
   - Lições importantes
   - **Tempo**: 10-15 minutos

**Total**: Aproximadamente 1 hora de aprendizado

---

### ⚡ Se você quer RESPONDER AS QUESTÕES RAPIDAMENTE
**→ Vá para:**
- **[ANALISE_TESTES.md](ANALISE_TESTES.md)**
  - Parte 1: Questões sobre estrutura (7 questões)
  - Parte 2: Análise de cada teste

---

### 👨‍💻 Se você quer CRIAR NOVO TESTE AGORA
**→ Vá para:**
- **[EXEMPLO_NOVO_TESTE.md](EXEMPLO_NOVO_TESTE.md)**
  - Siga os passos 1-7
  - Crie sua própria funcionalidade

---

### 🔍 Se você quer ENTENDER FALHAS
**→ Vá para:**
- **[DEMONSTRACAO_FALHA.md](DEMONSTRACAO_FALHA.md)**
  - Veja na prática como testes detectam bugs
  - Reproduza o cenário
  - Entenda o impacto

---

## 🧪 Rodando os Testes

### Todos os testes
```bash
npm test
```
**Resultado esperado**: 26 testes passando ✓

### Apenas testes da nova funcionalidade
```bash
npm test -- format-money.test.ts
```
**Resultado esperado**: 11 testes passando ✓

### Apenas testes originais
```bash
npm test -- app.test.ts error-normalizer.test.ts error-middleware.test.ts
```
**Resultado esperado**: 15 testes passando ✓

### Ver coverage (cobertura de testes)
```bash
npm test -- --coverage
```

---

## 📂 Arquivos de Teste Existentes

| Arquivo | Testes | Assunto |
|:---|:---:|:---|
| [tests/app.test.ts](tests/app.test.ts) | 2 | Health check, rotas 404 |
| [tests/core/errors/app-error.test.ts](tests/core/errors/app-error.test.ts) | 2 | Criação de erros |
| [tests/core/errors/error-normalizer.test.ts](tests/core/errors/error-normalizer.test.ts) | 8 | Normalização de erros |
| [tests/core/middleware/error-middleware.test.ts](tests/core/middleware/error-middleware.test.ts) | 3 | Middleware de erros |
| **[src/utils/format-money.test.ts](src/utils/format-money.test.ts)** | **11** | **Nova funcionalidade** |

---

## 🔧 Código Fonte

| Arquivo | Tipo | Descrição |
|:---|:---|:---|
| [src/core/errors/app-error.ts](src/core/errors/app-error.ts) | Classe | Erro customizado da aplicação |
| [src/core/errors/error-normalizer.ts](src/core/errors/error-normalizer.ts) | Função | Normaliza erros de diferentes fontes |
| [src/core/middleware/error-middleware.ts](src/core/middleware/error-middleware.ts) | Middleware | Processa erros no Express |
| **[src/utils/format-money.ts](src/utils/format-money.ts)** | **Função** | **Nova funcionalidade: formata moeda** |

---

## 📊 Estatísticas

```
Documentação: 4 arquivos
├─ RESUMO_ATIVIDADE.md
├─ ANALISE_TESTES.md
├─ EXEMPLO_NOVO_TESTE.md
└─ DEMONSTRACAO_FALHA.md

Código de Teste: 5 arquivos
├─ tests/app.test.ts (2 testes)
├─ tests/core/errors/app-error.test.ts (2 testes)
├─ tests/core/errors/error-normalizer.test.ts (8 testes)
├─ tests/core/middleware/error-middleware.test.ts (3 testes)
└─ src/utils/format-money.test.ts (11 testes) ⭐ NOVO!

Código de Implementação: 2 arquivos
├─ src/core/errors/error-normalizer.ts
├─ src/core/middleware/error-middleware.ts
└─ src/utils/format-money.ts ⭐ NOVO!

Total de Testes: 26 ✓
```

---

## 🎯 Mapa Conceitual

```
┌─────────────────────────────────────────────────────┐
│  ESTRUTURA DOS TESTES (Parte 1)                     │
├─────────────────────────────────────────────────────┤
│  7 Questões Respondidas:                            │
│  1. Framework: Vitest                               │
│  2. Finalidade: Automação de validação              │
│  3. Organização: describe + it                      │
│  4. Execução: Chamada direta / supertest / mocks    │
│  5. Resultado: expect() com matchers                │
│  6. Comparação: Assertions verificam resultado      │
│  7. Importância: Detecção automática de bugs        │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│  TESTES EXISTENTES (Parte 2)                        │
├─────────────────────────────────────────────────────┤
│  15 Testes Analisados:                              │
│  • 2 testes de API (app.test.ts)                    │
│  • 2 testes de classe (app-error.test.ts)           │
│  • 8 testes de normalização (error-normalizer)      │
│  • 3 testes de middleware (error-middleware)        │
│                                                     │
│  Para cada teste, identificamos:                    │
│  ✓ O que testa                                      │
│  ✓ Situação simulada                               │
│  ✓ Resultado esperado                              │
│  ✓ Resultado incorreto                             │
│  ✓ O que garante                                    │
│  ✓ Impacto se fosse removido                        │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│  NOVA FUNCIONALIDADE (Parte 3)                      │
├─────────────────────────────────────────────────────┤
│  Funcionalidade: formatMoney(value: number)         │
│                                                     │
│  11 Testes Criados:                                 │
│  ✓ 6 testes de SUCESSO (valores válidos)            │
│  ✗ 5 testes de FALHA (valores inválidos)            │
│                                                     │
│  Demonstração:                                      │
│  • Testes passam com código correto                 │
│  • Testes falharam quando removemos validação       │
│  • Restauramos código, testes passam novamente      │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│  LIÇÕES APRENDIDAS                                  │
├─────────────────────────────────────────────────────┤
│  ✓ Testes definem especificação                     │
│  ✓ Detectam bugs imediatamente                      │
│  ✓ Permitem refatorar com confiança                 │
│  ✓ Documentam o código                              │
│  ✓ Protegem contra regressão                        │
│  ✓ Economizam dinheiro e tempo                      │
│  ✓ São investimento, não custo                      │
└─────────────────────────────────────────────────────┘
```

---

## 🎬 Demonstração Rápida

### 1. Ver testes passando
```bash
npm test
# → 26 passed ✓
```

### 2. Abrir e ler testes
```bash
# Qualquer editor
# Leia: tests/core/errors/error-normalizer.test.ts
# Observe a estrutura describe + it
```

### 3. Ver testes falhando (opcional)
```bash
# Editar: src/utils/format-money.ts
# Remover as validações (linhas com Number.isFinite)
npm test -- format-money.test.ts
# → 6 failed (erro detectado!)
# Restaurar o código
npm test
# → 26 passed (tudo ok novamente) ✓
```

---

## 💡 Dicas

### Para Aprender
- Leia os documentos em ordem
- Execute `npm test` enquanto lê
- Modifique o código intencionalmente
- Veja os testes falharem e detectarem o problema

### Para Criar Novo Teste
1. Defina o comportamento esperado
2. Escreva os testes PRIMEIRO (TDD)
3. Execute (vai falhar - normal!)
4. Implemente o código
5. Execute novamente (deve passar!)
6. Refatore com confiança

### Para Investigar Testes
- Abra o arquivo de teste
- Procure por `describe()` para entender agrupamento
- Procure por `it()` para ver testes individuais
- Procure por `expect()` para ver assertions

---

## 📞 Próximas Ações

1. **Leia [RESUMO_ATIVIDADE.md](RESUMO_ATIVIDADE.md)** (5 min)
2. **Leia [ANALISE_TESTES.md](ANALISE_TESTES.md)** (25 min)
3. **Rode `npm test`** (2 min)
4. **Leia [EXEMPLO_NOVO_TESTE.md](EXEMPLO_NOVO_TESTE.md)** (15 min)
5. **Modifique o código e veja testes falharem** (10 min)
6. **Crie sua própria funcionalidade com testes** (30+ min)

---

## ✨ Conclusão

Você tem agora:
- ✅ Documentação completa e bem organizada
- ✅ 26 testes funcionando
- ✅ Exemplo prático de nova funcionalidade
- ✅ Demonstração de falha de testes
- ✅ Entendimento profundo de TDD

**Próximo passo**: Aplicar em seus próprios projetos! 🚀
