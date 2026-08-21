# Fluxos

## 1. Objetivo

Apresentar os fluxos operacionais principais do Sistema de Gestão de Treinamentos, servindo como referência para desenvolvimento, homologação e validação funcional.

## 2. Fluxo de Autenticação

1. O usuário informa e-mail e senha.
2. O sistema valida as credenciais.
3. Se as credenciais forem inválidas, o sistema exibe erro.
4. Se forem válidas, o sistema carrega perfis e permissões.
5. O usuário acessa o painel principal.

## 3. Fluxo de Cadastro de Funcionário

1. O usuário inicia um novo cadastro.
2. Informa os dados obrigatórios.
3. O sistema valida duplicidade de CPF e consistência dos campos.
4. Se houver erro, o sistema informa a inconsistência.
5. Se estiver tudo correto, o cadastro é gravado e auditado.

## 4. Fluxo de Importação de Funcionários

1. O usuário baixa o modelo oficial.
2. Preenche a planilha.
3. Envia o arquivo para importação.
4. O sistema valida o formato e os dados.
5. Se houver inconsistências, o sistema gera relatório.
6. Se estiver válido, os registros são importados e auditados.

## 5. Fluxo de Treinamento

1. O usuário cria o treinamento.
2. Vincula responsáveis, instrutores e participantes.
3. Salva o planejamento.
4. No dia do evento, inicia a execução.
5. Coleta assinaturas digitais dos participantes e instrutores.
6. Anexa as fotografias obrigatórias.
7. Encerra o treinamento.
8. Gera certificados e bloqueia alterações.

## 6. Fluxo de Assinatura Digital

1. O responsável inicia a coleta.
2. O participante assina na tela do tablet.
3. O sistema registra assinatura, data, hora, IP e geolocalização.
4. O processo se repete até o último participante.
5. Os instrutores também assinam quando aplicável.

## 7. Fluxo de Encerramento

1. O responsável solicita o encerramento.
2. O sistema valida pendências obrigatórias.
3. Se existir pendência, o sistema exibe o que falta concluir.
4. Se estiver tudo concluído, o treinamento é encerrado.
5. O sistema gera certificados, bloqueia edição e registra auditoria.

## 8. Fluxo de Emissão de Certificados

1. O treinamento encerrado é selecionado.
2. O sistema gera o PDF do certificado.
3. O documento recebe identificador único.
4. O certificado fica disponível para download e consulta.

## 9. Fluxo de Auditoria

1. O usuário seleciona o treinamento desejado.
2. O sistema exibe participantes, instrutores, evidências, assinaturas e certificados.
3. As informações permanecem disponíveis para consulta histórica e conferência externa.
