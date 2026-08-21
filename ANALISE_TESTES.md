# Análise de Testes Automatizados - API TypeScript

## Parte 1 — Conhecendo a Estrutura dos Testes

### 1. Qual framework está sendo utilizado para executar os testes automatizados?

**Resposta:** O framework utilizado é **Vitest**.

Identificação: Todos os arquivos de teste importam elementos do Vitest:
```typescript
import { describe, expect, it } from 'vitest';
```

O Vitest é um framework de teste moderno para projetos JavaScript/TypeScript que é rápido e compatível com a sintaxe do Jest.

---

### 2. Qual é a finalidade de um arquivo de teste dentro do projeto?

**Resposta:** A finalidade de um arquivo de teste é **automatizar a validação do comportamento esperado do código**.

Especificamente:
- Verificar se uma função ou comportamento funciona corretamente em cenários esperados
- Validar que casos de erro são tratados adequadamente
- Documentar o comportamento esperado do código através dos testes
- Garantir que mudanças futuras não quebrem funcionalidades existentes
- Fornecer confiança sobre a qualidade do código através da verificação automática

Os testes são executados automaticamente e reportam se o código se comporta como esperado, sem necessidade de testes manuais.

---

### 3. Como os testes estão organizados dentro do arquivo?

**Resposta:** Os testes são organizados usando uma hierarquia de agrupamentos:

**Estrutura:**
```
describe('Agrupamento principal') {
    it('Teste individual 1') { ... }
    it('Teste individual 2') { ... }
}
```

- **`describe()`**: Agrupa testes relacionados sob um tema comum
  - Exemplo: `describe('GET /health', ...)` agrupa testes sobre a rota `/health`
  - Exemplo: `describe('AppError', ...)` agrupa testes sobre a classe `AppError`
  
- **`it()`**: Define um teste individual com uma descrição clara em português
  - Exemplo: `it('deve retornar o status da aplicação', ...)`
  - Cada `it()` testa um cenário específico

**Benefícios dessa organização:**
- Clareza: fácil entender o que cada teste faz
- Manutenibilidade: testes relacionados estão agrupados
- Documentação: a descrição do teste descreve o comportamento esperado
- Reutilização: testes dentro do mesmo `describe` compartilham contexto

---

### 4. Como o teste executa a função que está sendo avaliada?

**Resposta:** A execução depende do tipo de teste:

**Para testes de funções simples:**
```typescript
// app-error.test.ts
const error = new AppError({
    error: ERROR_TYPES.CONFLICT,
    message: 'Registro já existe.',
});
// A função/classe é executada diretamente com dados de teste
```

**Para testes de middleware/funções que retornam valores:**
```typescript
// error-normalizer.test.ts
const normalizedError = normalizeError(prismaError);
// A função é chamada com um parâmetro (erro Prisma)
```

**Para testes de APIs HTTP:**
```typescript
// app.test.ts
const response = await request(app).get('/health');
// Usa a biblioteca 'supertest' para fazer requisições HTTP reais contra a app
// O 'await' aguarda a resposta assíncrona
```

**Para testes com mocks (simulação de comportamento):**
```typescript
// error-middleware.test.ts
const response = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
} as unknown as Response;
// 'vi.fn()' cria uma função simulada que pode ser monitorada
```

---

### 5. Como o teste determina qual seria o resultado correto?

**Resposta:** O resultado esperado é definido usando a função **`expect()`**:

```typescript
expect(response.status).toBe(200);
// Espera que o status seja exatamente 200

expect(response.body).toMatchObject({
    status: 'UP',
});
// Espera que o corpo da resposta contenha um objeto com { status: 'UP' }

expect(error).toBeInstanceOf(AppError);
// Espera que o erro seja uma instância da classe AppError

expect(normalizedError.code).toBe('CONFLICT');
// Espera que o código seja exatamente 'CONFLICT'
```

**Métodos de asserção utilizados:**
- `toBe()`: Comparação exata (===)
- `toEqual()`: Comparação profunda de objetos
- `toMatchObject()`: Verifica se contém as propriedades esperadas
- `toBeInstanceOf()`: Verifica se é instância de uma classe
- `toHaveBeenCalledWith()`: Verifica argumentos de chamadas a funções
- `toBeDefined()`: Verifica se um valor não é `undefined`

---

### 6. Como o teste compara o resultado obtido com o resultado esperado?

**Resposta:** A comparação é feita através de **assertions (asserções)** usando a função `expect()`:

**Processo:**
1. **Executar o código**: chamar a função/rota com dados de teste
2. **Capturar o resultado**: armazenar em uma variável (ex: `response`, `error`, `normalizedError`)
3. **Fazer assertions**: usar `expect()` para validar o resultado

**Exemplos práticos:**

```typescript
// Comparação de valor primitivo
expect(error.statusCode).toBe(409);
// ✓ Passa se statusCode === 409
// ✗ Falha se statusCode !== 409

// Comparação de estrutura de objeto
expect(response.body).toEqual({
    success: false,
    error: {
        code: 'NOT_FOUND',
        message: 'Rota não encontrada.',
    },
});
// ✓ Passa se a estrutura é idêntica
// ✗ Falha se há diferenças

// Comparação de tipo
expect(normalizedError).toBeInstanceOf(AppError);
// ✓ Passa se normalizedError é instância de AppError
// ✗ Falha se não for

// Comparação de chamadas a funções
expect(response.status).toHaveBeenCalledWith(409);
// ✓ Passa se a função foi chamada com argumento 409
// ✗ Falha se foi chamada com outro valor
```

O Vitest compara o resultado esperado com o resultado obtido e:
- **PASSA**: se a assertion é verdadeira
- **FALHA**: se a assertion é falsa, e mostra a diferença

---

### 7. Por que é importante que o teste seja capaz de verificar automaticamente o resultado, em vez de depender apenas da observação do programador?

**Resposta:** A verificação automática é crucial por várias razões:

**1. Velocidade**
- Um programador levaria muito tempo testando manualmente cada cenário
- Os testes automatizados executam em milissegundos e podem ser rodados a qualquer momento
- Permite feedback rápido durante desenvolvimento

**2. Confiabilidade**
- Humanos cometem erros e podem "não ver" problemas em testes manuais
- Os testes automatizados são precisos e consistentes
- Não sofrem fadiga ou perdem detalhes

**3. Cobertura Completa**
- É viável testar automaticamente centenas de cenários diferentes
- Manualmente seria impraticável cobrir todos os casos
- Testes podem incluir casos raros ou edge cases

**4. Regressão**
- Quando código é modificado, os testes rodam automaticamente
- Detecta imediatamente se a mudança quebrou funcionalidades existentes
- Sem testes, você só descobriria problemas em produção

**5. Documentação**
- Os testes servem como documentação de como o código deve funcionar
- Um novo desenvolvedor entender os testes entende o comportamento esperado

**6. Manutenibilidade**
- Mudanças no código podem ser feitas com confiança
- Se algo quebra, os testes informam imediatamente
- Reduz o custo de manutenção a longo prazo

**Exemplo prático:**
```typescript
// Sem teste automático:
// → Você roda a aplicação
// → Testa manualmente cada rota
// → Confia que funcionou
// → Mais tarde, outro desenvolvedor muda o código
// → Bug aparece em produção (muito caro!)

// Com teste automático:
// → Você escreve um teste que valida o comportamento
// → O teste roda automaticamente toda vez que alguém faz push
// → Se alguém quebra o código, o teste falha imediatamente
// → O bug é descoberto e corrigido antes de ir para produção
```

---

## Parte 2 — Compreendendo os Testes Existentes

### Arquivo: [tests/app.test.ts](tests/app.test.ts)

#### Teste 1: "GET /health"

**1. Qual função ou comportamento está sendo testado?**
- A rota HTTP GET `/health` da aplicação
- Especificamente: o endpoint que retorna o status de saúde da aplicação

**2. Qual situação está sendo simulada?**
- Um cliente faz uma requisição GET para `/health`
- A aplicação processa a requisição e retorna uma resposta

**3. Qual resultado era esperado?**
- Status HTTP: 200 (OK)
- Corpo da resposta com objeto contendo:
  - `status`: com valor "UP"
  - `timestamp`: uma propriedade definida (timestamp do momento)

**4. Qual resultado seria considerado incorreto?**
- Status diferente de 200 (ex: 404, 500)
- Corpo da resposta sem a propriedade `status`
- `status` com valor diferente de "UP"
- Ausência da propriedade `timestamp`

**5. O que exatamente o teste está garantindo?**
- Que a aplicação está respondendo a requisições
- Que a rota `/health` existe e é acessível
- Que o servidor está funcionando (UP)
- Que há uma timestamp indicando quando a verificação foi feita

**6. O que poderia acontecer no sistema se esse comportamento fosse alterado?**
- Ferramentas de monitoramento falhariam ao verificar se a aplicação está ativa
- Orquestradores (Docker, Kubernetes) não conseguiriam fazer health check
- Você perderia a capacidade de monitorar se o servidor está funcionando
- Sistemas de auto-healing/restart não conseguiriam detectar quando reiniciar a aplicação
- Em produção, a aplicação poderia ficar fora do ar sem ser detectada

---

#### Teste 2: "Rotas inexistentes"

**1. Qual função ou comportamento está sendo testado?**
- O tratamento de rotas não mapeadas
- Como a aplicação responde quando alguém tenta acessar uma URL que não existe

**2. Qual situação está sendo simulada?**
- Um cliente faz uma requisição GET para `/rota-que-nao-existe`
- A aplicação não tem uma rota definida para este endereço

**3. Qual resultado era esperado?**
- Status HTTP: 404 (Not Found)
- Corpo da resposta padronizado com:
  - `success`: false
  - `error`:
    - `code`: "NOT_FOUND"
    - `message`: "Rota não encontrada."

**4. Qual resultado seria considerado incorreto?**
- Status diferente de 404 (ex: 200, 500)
- Resposta sem a estrutura padronizada
- Mensagem de erro diferente
- Código de erro diferente

**5. O que exatamente o teste está garantindo?**
- Que rotas não mapeadas retornam erro apropriado (404)
- Que o erro é formatado de forma padronizada
- Que a aplicação não quebra quando recebe requisições inválidas
- Que o cliente recebe feedback claro sobre o problema (NOT_FOUND)

**6. O que poderia acontecer no sistema se esse comportamento fosse alterado?**
- A aplicação poderia retornar 200 OK para rotas que não existem (confundindo clientes)
- Erros genéricos poderiam vazar informações sensíveis sobre a aplicação
- Clientes não saberiam distinguir entre uma falha da aplicação e uma rota inválida
- Seria impossível debugar problemas de rotas com clientes
- A aplicação seria vulnerável a comportamentos inesperados

---

### Arquivo: [tests/core/errors/app-error.test.ts](tests/core/errors/app-error.test.ts)

#### Teste 1: "AppError - criação com código e status corretos"

**1. Qual função ou comportamento está sendo testado?**
- O construtor da classe `AppError`
- Verificar se a classe cria objetos de erro com as propriedades corretas

**2. Qual situação está sendo simulada?**
- Criação de um erro de aplicação do tipo CONFLICT
- Associação de uma mensagem ao erro

**3. Qual resultado era esperado?**
- O objeto criado deve ser uma instância de `Error` (classe nativa)
- O objeto criado deve ser uma instância de `AppError` (classe customizada)
- Propriedade `name`: "AppError"
- Propriedade `message`: "Registro já existe."
- Propriedade `code`: "CONFLICT"
- Propriedade `statusCode`: 409 (código HTTP para Conflict)

**4. Qual resultado seria considerado incorreto?**
- Não ser uma instância de `Error` ou `AppError`
- Propriedades com valores diferentes dos esperados
- `statusCode` diferente de 409
- `code` diferente de "CONFLICT"

**5. O que exatamente o teste está garantindo?**
- Que `AppError` é uma classe de erro válida que herda de `Error`
- Que as propriedades são configuradas corretamente
- Que o mapeamento entre tipo de erro (ERROR_TYPES.CONFLICT) e statusCode (409) está correto
- Que a mensagem é preservada

**6. O que poderia acontecer no sistema se esse comportamento fosse alterado?**
- A camada de tratamento de erros receberia objetos inválidos
- Os status HTTP retornados aos clientes seriam incorretos
- O middleware de erro não conseguiria processar corretamente
- Clientes receberiam respostas HTTP com status codes não apropriados
- Erros não poderiam ser propagados corretamente através da aplicação

---

#### Teste 2: "AppError - preservação de detalhes adicionais"

**1. Qual função ou comportamento está sendo testado?**
- A capacidade da classe `AppError` de armazenar informações adicionais (details)
- Verificar se dados auxiliares são preservados no erro

**2. Qual situação está sendo simulada?**
- Criação de um erro com dados adicionais (field, value)
- Esses dados forneceriam contexto sobre onde e por que o erro ocorreu

**3. Qual resultado era esperado?**
- O erro deve ser criado normalmente
- A propriedade `details` deve conter exatamente o objeto passado:
  ```javascript
  { field: 'email', value: 'usuario@fg.local' }
  ```

**4. Qual resultado seria considerado incorreto?**
- Propriedade `details` vazia ou undefined
- Dados dos `details` alterados ou perdidos
- Structure diferente da esperada

**5. O que exatamente o teste está garantindo?**
- Que informações adicionais sobre o erro são preservadas
- Que o contexto do erro é mantido intacto
- Que é possível passar dados customizados junto com o erro

**6. O que poderia acontecer no sistema se esse comportamento fosse alterado?**
- Informações de debugging seriam perdidas
- O middleware de erro não conseguiria retornar detalhes úteis aos clientes
- Seria impossível informar ao cliente qual campo causou o problema
- Debugging de erros ficaria muito mais difícil
- Experiência do cliente seria prejudicada (respostas genéricas)

---

### Arquivo: [tests/core/errors/error-normalizer.test.ts](tests/core/errors/error-normalizer.test.ts)

#### Teste 1: "normalizeError - P2002 em erro de conflito"

**1. Qual função ou comportamento está sendo testado?**
- A função `normalizeError()` com erro Prisma código P2002
- Verificar se erros do banco de dados são convertidos em AppError

**2. Qual situação está sendo simulada?**
- Prisma retorna erro P2002 (violação de constraint unique)
- Exemplo: Tentativa de inserir email duplicado

**3. Qual resultado era esperado?**
- Deve retornar uma instância de `AppError`
- `code`: "CONFLICT"
- `statusCode`: 409
- `message`: "Registro duplicado."

**4. Qual resultado seria considerado incorreto?**
- Retornar o erro original do Prisma sem conversão
- Retornar um erro com código diferente
- Status code diferente de 409

**5. O que exatamente o teste está garantindo?**
- Que erros de banco de dados são mapeados para AppError
- Que o código Prisma P2002 é reconhecido como CONFLICT
- Que o status HTTP apropriado (409) é usado
- Que o cliente recebe uma mensagem clara em português

**6. O que poderia acontecer no sistema se esse comportamento fosse alterado?**
- Erros do Prisma viajariam até o cliente sem transformação
- Clientes receberiam erros genéricos do Prisma (mensagens em inglês, estrutura confusa)
- Status HTTP seria 500 (interno) em vez de 409 (conflito)
- Seria impossível tratar erros de duplicação apropriadamente
- Experiência do usuário seria muito ruim

---

#### Teste 2: "normalizeError - P2025 em erro não encontrado"

**1. Qual função ou comportamento está sendo testado?**
- A função `normalizeError()` com erro Prisma código P2025
- Conversão de erro "record not found" do Prisma

**2. Qual situação está sendo simulada?**
- Tentativa de deletar um registro que não existe no banco
- Ou buscar um registro inexistente

**3. Qual resultado era esperado?**
- Deve retornar `AppError`
- `code`: "NOT_FOUND"
- `statusCode`: 404
- `message`: "Registro não encontrado."

**4. Qual resultado seria considerado incorreto?**
- Retornar erro 500 em vez de 404
- Mensagem genérica em vez de "Registro não encontrado."
- Código diferente

**5. O que exatamente o teste está garantindo?**
- Que operações contra registros inexistentes são tratadas apropriadamente
- Que o cliente recebe 404 (Not Found) - status correto
- Que a semântica do erro é clara

**6. O que poderia acontecer no sistema se esse comportamento fosse alterado?**
- Deletar um registro inexistente retornaria 500 (erro de servidor)
- Clientes não conseguiriam distinguir entre erro da aplicação e recurso inexistente
- Seria impossível implementar UX apropriada (ex: "Registro não encontrado")
- Logs de erro ficariam cheios de "erros internos" que na verdade são registros inexistentes

---

#### Teste 3: "normalizeError - código Prisma desconhecido em erro interno"

**1. Qual função ou comportamento está sendo testado?**
- A função `normalizeError()` com um código Prisma não tratado explicitamente (P2000)
- Fallback para erro interno quando o tipo de erro não é reconhecido

**2. Qual situação está sendo simulada?**
- Prisma retorna um erro com código que a aplicação não possui tratamento específico
- Código P2000 é um erro genérico de Prisma

**3. Qual resultado era esperado?**
- Deve retornar `AppError`
- `code`: "INTERNAL_ERROR"
- `statusCode`: 500
- `message`: "Erro interno do servidor."

**4. Qual resultado seria considerado incorreto?**
- Passar o erro do Prisma diretamente
- Status code diferente de 500
- Mensagem expondo detalhes internos

**5. O que exatamente o teste está garantindo?**
- Que erros desconhecidos são tratados com segurança
- Que nenhum erro de banco de dados vaza informações sensíveis
- Que há um fallback apropriado para erros não mapeados

**6. O que poderia acontecer no sistema se esse comportamento fosse alterado?**
- Informações internas do Prisma viajariam para clientes (segurança)
- Erros não mapeados mostrariam detalhes do schema do banco
- Seria impossível manter consistência na resposta de erros
- Clientes receberiam informações inconsistentes de erro

---

#### Teste 4: "normalizeError - PrismaClientValidationError em BAD_REQUEST"

**1. Qual função ou comportamento está sendo testado?**
- Conversão de erro de validação do Prisma
- Quando uma query é inválida

**2. Qual situação está sendo simulada?**
- Prisma detecta uma query malformada ou inválida
- Erro é lançado antes de ir para o banco de dados

**3. Qual resultado era esperado?**
- Deve retornar `AppError`
- `code`: "BAD_REQUEST"
- `statusCode`: 400
- `message`: "Consulta inválida."

**4. Qual resultado seria considerado incorreto?**
- Status 500 em vez de 400
- Código diferente de BAD_REQUEST

**5. O que exatamente o teste está garantindo?**
- Que erros de validação do Prisma são reconhecidos
- Que o cliente recebe status apropriado (400 - Bad Request)
- Que há diferença entre erro do cliente (400) e erro do servidor (500)

**6. O que poderia acontecer se esse comportamento fosse alterado?**
- Erros causados pelo cliente seriam reportados como erros de servidor
- Sistemas de monitoramento não conseguiriam distinguir culpa
- Logs de erro conteriam problemas causados pelo cliente

---

#### Teste 5: "normalizeError - retorno de AppError recebido"

**1. Qual função ou comportamento está sendo testado?**
- Comportamento da função quando recebe um `AppError` já transformado
- Verificar que não há transformação dupla

**2. Qual situação está sendo simulada?**
- Um `AppError` é passado para `normalizeError()`
- A função já recebe um erro do tipo correto

**3. Qual resultado era esperado?**
- Deve retornar o **mesmo objeto** (identidade, não cópia)
- `normalizedError === originalError` deve ser true

**4. Qual resultado seria considerado incorreto?**
- Criar um novo objeto
- Modificar o error recebido

**5. O que exatamente o teste está garantindo?**
- Que `normalizeError()` é idempotente (chamar várias vezes não muda o resultado)
- Que não há processamento duplo
- Que o objeto original é preservado

**6. O que poderia acontecer se esse comportamento fosse alterado?**
- Erros poderiam ser processados múltiplas vezes
- Informações adicionais poderiam ser perdidas
- Performance poderia ser afetada (cópias desnecessárias)

---

#### Teste 6: "normalizeError - ZodError em AppError de validação"

**1. Qual função ou comportamento está sendo testado?**
- Conversão de erro de validação do Zod
- Tratamento de validações de schema

**2. Qual situação está sendo simulada?**
- Zod valida um objeto contra um schema
- O objeto não cumpre as regras (nome muito curto)
- Zod lança um ZodError

**3. Qual resultado era esperado?**
- Deve retornar `AppError`
- `code`: "VALIDATION_ERROR"
- `statusCode`: 400
- `message`: alguma mensagem de validação
- `details`: array com informações dos erros, contendo:
  - `code`: "too_small" (razão do erro)
  - `path`: "name" (qual campo)
  - `message`: definida (explicação)

**4. Qual resultado seria considerado incorreto?**
- Status diferente de 400
- `details` vazio ou estrutura incorreta
- Sem informação sobre qual campo falhou

**5. O que exatamente o teste está garantindo?**
- Que erros de validação do Zod são convertidos
- Que o cliente sabe qual campo teve problema
- Que a razão do erro é comunicada
- Que há details para debugging

**6. O que poderia acontecer se esse comportamento fosse alterado?**
- Clientes não saberiam qual campo tem problema
- UX seria ruim (mensagens genéricas)
- Seria impossível fazer validação client-side baseada no servidor
- Debugging de validações seria muito difícil

---

#### Teste 7: "normalizeError - erro desconhecido em erro interno"

**1. Qual função ou comportamento está sendo testado?**
- Comportamento quando um `Error` genérico é passado
- Erro que não é Prisma, Zod ou AppError

**2. Qual situação está sendo simulada?**
- Um `new Error('Erro inesperado.')` é lançado
- Algo não esperado acontece

**3. Qual resultado era esperado?**
- Deve retornar `AppError`
- `code`: "INTERNAL_ERROR"
- `statusCode`: 500
- `message`: "Erro interno do servidor."

**4. Qual resultado seria considerado incorreto?**
- Passar o erro original para o cliente
- Expor a mensagem do erro interno

**5. O que exatamente o teste está garantindo?**
- Que erros genéricos não vazam para o cliente
- Que há sempre uma resposta apropriada
- Que informações internas são protegidas

**6. O que poderia acontecer se esse comportamento fosse alterado?**
- Stack traces viajariam para clientes (segurança crítica)
- Estrutura interna do código seria exposta
- Clientes receberiam informações não estruturadas

---

#### Teste 8: "normalizeError - valores não-Error em erro interno"

**1. Qual função ou comportamento está sendo testado?**
- Robustez de `normalizeError()` contra entradas inesperadas
- Quando algo que não é Error é lançado como erro

**2. Qual situação está sendo simulada?**
- Uma string `'erro inesperado'` é lançada (em vez de um Error)
- Isso é possível em JavaScript (você pode `throw 'qualquer coisa'`)

**3. Qual resultado era esperado?**
- Deve retornar `AppError`
- `code`: "INTERNAL_ERROR"
- `statusCode`: 500

**4. Qual resultado seria considerado incorreto?**
- Quebrar com erro
- Passar a string diretamente

**5. O que exatamente o teste está garantindo?**
- Que `normalizeError()` é defensivo
- Que trata qualquer entrada inesperada apropriadamente
- Que a aplicação não quebra

**6. O que poderia acontecer se esse comportamento fosse alterado?**
- Erros não-Error poderiam quebrar a aplicação
- Middleware de erro falharia
- Aplicação poderia ficar em estado instável

---

### Arquivo: [tests/core/middleware/error-middleware.test.ts](tests/core/middleware/error-middleware.test.ts)

#### Teste 1: "errorMiddleware - transformação de AppError"

**1. Qual função ou comportamento está sendo testado?**
- O middleware `errorMiddleware()` que processa erros no Express
- Transformação de `AppError` em resposta HTTP

**2. Qual situação está sendo simulada?**
- Um erro CONFLICT é lançado
- O middleware Express chamado com o erro
- Request POST para `/api/users` a partir de IP 127.0.0.1

**3. Qual resultado era esperado?**
- `response.status()` chamado com 409
- `response.json()` chamado com objeto:
  ```javascript
  {
    success: false,
    error: {
      code: 'CONFLICT',
      message: 'Registro já existe.',
    },
  }
  ```

**4. Qual resultado seria considerado incorreto?**
- Status code diferente
- JSON sem a estrutura correta
- Dados vazios

**5. O que exatamente o teste está garantindo?**
- Que erros são convertidos em respostas HTTP apropriadas
- Que o status code é correto
- Que a resposta tem formato consistente
- Que o cliente recebe JSON válido

**6. O que poderia acontecer se esse comportamento fosse alterado?**
- Respostas de erro teriam formatos diferentes
- Clientes não conseguiriam parsear erros
- Seria impossível tratamento consistente de erros no client-side
- Experiência do usuário seria inconsistente

---

#### Teste 2: "errorMiddleware - transformação de erro desconhecido"

**1. Qual função ou comportamento está sendo testado?**
- Como o middleware trata erros que não são `AppError`
- Proteção contra erros genéricos

**2. Qual situação está sendo simulada?**
- Um `Error` genérico é lançado (não é AppError)
- Mensagem potencialmente sensível: "Erro interno que não deve ser exposto."

**3. Qual resultado era esperado?**
- `response.status()` chamado com 500
- `response.json()` chamado com:
  ```javascript
  {
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Erro interno do servidor.',
    },
  }
  ```
- Mensagem original **NÃO** é retornada (segurança!)

**4. Qual resultado seria considerado incorreto?**
- Retornar a mensagem original do erro
- Status diferente de 500
- Expor detalhes internos

**5. O que exatamente o teste está garantindo?**
- Que informações sensíveis não vazam para clientes
- Que erros inesperados são tratados com segurança
- Que há sempre uma resposta apropriada

**6. O que poderia acontecer se esse comportamento fosse alterado?**
- Stack traces e informações internas viajariam para clientes
- Vulnerabilidades de segurança (information disclosure)
- Atacantes descobririam detalhes da implementação
- Produção ficaria insegura

---

#### Teste 3: "errorMiddleware - inclusão de details"

**1. Qual função ou comportamento está sendo testado?**
- Como o middleware inclui `details` quando o `AppError` possuir
- Adição de contexto adicional na resposta

**2. Qual situação está sendo simulada?**
- Um erro BAD_REQUEST com detalhes sobre qual campo falhou
- Details: `{ field: 'email', reason: 'Formato inválido.' }`

**3. Qual resultado era esperado?**
- `response.status()` chamado com 400
- `response.json()` chamado com:
  ```javascript
  {
    success: false,
    error: {
      code: 'BAD_REQUEST',
      message: 'Dados inválidos.',
      details: {
        field: 'email',
        reason: 'Formato inválido.',
      },
    },
  }
  ```

**4. Qual resultado seria considerado incorreto?**
- Details omitidos
- Details modificados
- Estrutura sem details

**5. O que exatamente o teste está garantindo?**
- Que informações adicionais são preservadas na resposta
- Que o cliente recebe contexto sobre o erro
- Que é possível debugging do lado do cliente

**6. O que poderia acontecer se esse comportamento fosse alterado?**
- Clientes receberiam mensagens genéricas
- Seria impossível mostrar qual campo tem problema
- UX seria ruim (usuário não saberia o que corrigir)
- Validação client-side seria impossível

---

## Resumo

Os testes no projeto garantem:

1. **Health Check**: A aplicação está respondendo
2. **404 Handling**: Rotas inválidas são tratadas apropriadamente
3. **Error Class**: Erros de aplicação são criados corretamente
4. **Error Normalization**: Diferentes tipos de erro (Prisma, Zod) são convertidos em formato padrão
5. **Error Middleware**: Erros são transformados em respostas HTTP seguras e consistentes

O projeto implementa um sistema robusto de tratamento de erros que:
- Converte erros de diferentes bibliotecas em um formato único
- Mapeia erros para status HTTP apropriados
- Protege informações sensíveis
- Fornece contexto útil ao cliente
- Garante respostas consistentes
