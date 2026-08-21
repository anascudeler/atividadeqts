# Regras de Negócio

## 1. Objetivo

Consolidar as regras que governam o comportamento do Sistema de Gestão de Treinamentos, assegurando consistência entre autenticação, cadastro, execução dos treinamentos, evidências e auditoria.

## 2. Regras de Acesso e Perfis

- RN-001: somente usuários autenticados poderão acessar o sistema.
- RN-002: toda funcionalidade deverá validar permissões antes da execução.
- RN-003: um usuário poderá possuir um ou mais perfis.
- RN-004: as permissões serão herdadas exclusivamente por meio dos perfis.
- RN-005: a remoção de um perfil de um usuário revoga imediatamente as permissões associadas.
- RN-006: usuários inativos não poderão autenticar-se.
- RN-007: funcionários poderão existir sem possuir usuário.
- RN-008: instrutores externos não possuirão acesso ao sistema.
- RN-009: um treinamento somente poderá ser alterado por seus responsáveis ou por usuários com permissão administrativa.
- RN-010: após o encerramento do treinamento nenhuma permissão permitirá alteração de seu conteúdo.

## 3. Regras do Modelo de Dados

- MD-001: todo usuário deverá estar associado a um funcionário.
- MD-002: todo treinamento deverá possuir pelo menos um responsável.
- MD-003: todo treinamento deverá possuir pelo menos um instrutor.
- MD-004: todo treinamento deverá possuir pelo menos um participante antes do encerramento.

## 4. Regras de Execução do Treinamento

- O treinamento será sempre presencial.
- Cada treinamento ocorrerá em uma única data.
- O responsável pelo treinamento deverá permanecer autenticado durante as operações críticas.
- A coleta de assinaturas somente poderá ocorrer quando o treinamento estiver em andamento.
- As assinaturas deverão ser capturadas presencialmente no momento da realização do treinamento.
- O encerramento somente poderá ocorrer após o atendimento de todas as pendências obrigatórias.

## 5. Regras de Evidências e Certificados

- As fotografias deverão ser anexadas antes do encerramento do treinamento.
- As evidências deverão permanecer vinculadas ao treinamento durante todo o período de retenção definido pela empresa.
- Os certificados somente poderão ser emitidos após o encerramento do treinamento.
- Cada certificado deverá possuir identificador único para validação futura.
- Treinamentos encerrados deverão permanecer disponíveis para auditoria e consulta histórica.

## 6. Regras de Integridade e Auditoria

- Toda operação relevante deverá gerar auditoria.
- Os registros históricos não poderão ser alterados por usuários da aplicação.
- Os dados históricos de usuários, funcionários, instrutores e treinamentos inativados deverão ser preservados.
- As assinaturas registradas não poderão ser substituídas após o encerramento do treinamento.
