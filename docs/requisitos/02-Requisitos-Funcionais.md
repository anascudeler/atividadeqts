# Requisitos Funcionais

## 1. Objetivo

Este documento consolida as funcionalidades previstas para a primeira versão do Sistema de Gestão de Treinamentos, organizadas por módulo funcional e numeradas para fins de rastreabilidade.

## 2. Módulo de Usuários

### RF-USU-001 - Cadastro de Usuários

O sistema deverá permitir cadastrar usuários autorizados a acessar a aplicação. Cada usuário deverá estar vinculado a um funcionário e deverá autenticar-se por e-mail e senha.

### RF-USU-002 - Alteração de Usuário

O sistema deverá permitir alterar os dados cadastrais de usuários ativos, respeitando as permissões do usuário autenticado.

### RF-USU-003 - Inativação de Usuário

O sistema deverá permitir inativar usuários. Usuários inativos não poderão autenticar-se, mas seus dados históricos deverão permanecer disponíveis.

### RF-USU-004 - Redefinição de Senha

O sistema deverá permitir redefinir a senha dos usuários autorizados, registrando auditoria da operação.

### RF-USU-005 - Consulta de Usuários

O sistema deverá permitir consultar usuários cadastrados por filtros como nome, e-mail e status.

## 3. Módulo de Perfis

### RF-PER-001 - Cadastro de Perfis

O sistema deverá permitir cadastrar perfis de acesso, cada um representando um conjunto de permissões.

### RF-PER-002 - Associação de Permissões

O sistema deverá permitir associar e remover permissões de um perfil.

### RF-PER-003 - Associação de Usuários

O sistema deverá permitir vincular usuários aos perfis de acesso.

### RF-PER-004 - Consulta de Perfis

O sistema deverá permitir consultar os perfis cadastrados e suas permissões.

## 4. Módulo de Funcionários

### RF-FUN-001 - Cadastro de Funcionário

O sistema deverá permitir cadastrar funcionários com os dados necessários para participação em treinamentos.

### RF-FUN-002 - Importação por Planilha

O sistema deverá permitir importar funcionários por meio de planilha modelo disponibilizada pela aplicação.

### RF-FUN-003 - Atualização Cadastral

O sistema deverá permitir atualizar os dados cadastrais de funcionários ativos.

### RF-FUN-004 - Inativação

O sistema deverá permitir inativar funcionários, preservando o histórico de participação.

### RF-FUN-005 - Histórico de Treinamentos

O sistema deverá permitir consultar o histórico de treinamentos de cada funcionário.

## 5. Módulo de Instrutores

### RF-INS-001 - Cadastro de Instrutor

O sistema deverá permitir cadastrar instrutores internos e externos.

### RF-INS-002 - Atualização de Instrutor

O sistema deverá permitir atualizar os dados cadastrais de instrutores ativos.

### RF-INS-003 - Consulta de Instrutor

O sistema deverá permitir consultar instrutores cadastrados.

### RF-INS-004 - Inativação de Instrutor

O sistema deverá permitir inativar instrutores sem perder os vínculos históricos.

### RF-INS-005 - Consulta de Treinamentos Ministrados

O sistema deverá permitir consultar os treinamentos ministrados por cada instrutor.

## 6. Módulo de Treinamentos

### RF-TRE-001 - Cadastro de Treinamento

O sistema deverá permitir cadastrar um novo treinamento presencial com seus dados básicos e planejamento inicial.

### RF-TRE-002 - Adicionar Responsáveis

O sistema deverá permitir vincular um ou mais responsáveis ao treinamento.

### RF-TRE-003 - Adicionar Instrutores

O sistema deverá permitir vincular um ou mais instrutores ao treinamento.

### RF-TRE-004 - Adicionar Participantes

O sistema deverá permitir vincular participantes ao treinamento a partir do cadastro de funcionários.

### RF-TRE-005 - Remover Participantes

O sistema deverá permitir remover participantes enquanto o treinamento não estiver encerrado.

### RF-TRE-006 - Iniciar Treinamento

O sistema deverá permitir iniciar a execução do treinamento quando todos os dados obrigatórios estiverem definidos.

### RF-TRE-007 - Registrar Assinaturas Digitais

O sistema deverá permitir registrar a assinatura digital dos participantes e instrutores no momento da execução.

### RF-TRE-008 - Registrar Fotografias

O sistema deverá permitir anexar fotografias como evidência do treinamento.

### RF-TRE-009 - Encerrar Treinamento

O sistema deverá permitir encerrar o treinamento quando não houver pendências obrigatórias.

### RF-TRE-010 - Emitir Certificados

O sistema deverá permitir emitir certificados para os participantes após o encerramento do treinamento.

### RF-TRE-011 - Consultar Evidências

O sistema deverá permitir consultar todas as evidências associadas ao treinamento.

### RF-TRE-012 - Consultar Histórico

O sistema deverá permitir consultar o histórico consolidado dos treinamentos realizados.

## 7. Critérios Gerais

- Toda funcionalidade crítica deverá registrar auditoria.
- Nenhuma funcionalidade deverá depender apenas da validação visual da interface.
- As operações devem respeitar o estado atual do treinamento.
- As telas devem preservar o histórico e não ocultar informações necessárias para auditoria.
