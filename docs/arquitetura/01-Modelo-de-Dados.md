# Modelo de Dados

## 1. Objetivo

Descrever as entidades centrais do domínio do Sistema de Gestão de Treinamentos, seus relacionamentos e as convenções adotadas para preservar integridade, rastreabilidade e evolução da solução.

## 2. Visão Geral

O domínio do sistema gira em torno de cinco entidades principais:

- Usuários;
- Funcionários;
- Instrutores;
- Treinamentos;
- Perfis de Acesso.

Essas entidades se relacionam com estruturas auxiliares para representar permissões, participações, responsáveis, assinaturas e evidências.

## 3. Convenções

- As tabelas utilizarão chave primária numérica.
- As chaves estrangeiras seguirão o padrão <entidade>_id.
- Sempre que aplicável, as entidades possuirão created_at, updated_at e deleted_at.
- A exclusão lógica será adotada para preservar histórico.
- As alterações relevantes serão registradas em mecanismo próprio de auditoria.

## 4. Entidades Principais

### Usuários

Representam as pessoas autorizadas a acessar o sistema. Cada usuário deve estar vinculado a um funcionário.

### Funcionários

Representam os colaboradores que participam dos treinamentos. Nem todo funcionário possui acesso ao sistema.

### Instrutores

Representam os profissionais que ministram treinamentos, internos ou externos.

### Treinamentos

Representam o evento presencial de capacitação, com responsáveis, instrutores, participantes, assinaturas e evidências.

### Perfis de Acesso

Representam os papéis de autorização usados no modelo RBAC.

## 5. Relacionamentos Principais

- Usuários e Perfis: N para N.
- Perfis e Permissões: N para N.
- Funcionários e Treinamentos: N para N por meio de participantes.
- Instrutores e Treinamentos: N para N.
- Responsáveis e Treinamentos: N para N.

## 6. Regras Estruturais

- Todo usuário deverá estar associado a um funcionário.
- Todo treinamento deverá possuir pelo menos um responsável.
- Todo treinamento deverá possuir pelo menos um instrutor.
- Todo treinamento deverá possuir pelo menos um participante antes do encerramento.
- Treinamentos encerrados não poderão ser alterados.

## 7. Relacionamentos de Apoio

A modelagem deverá prever os vínculos necessários para armazenar assinaturas digitais, geolocalização, endereço IP, fotos, certificados e histórico de auditoria.

## 8. Referência Visual

O DER final deverá ser anexado na pasta de anexos como material de apoio à implementação do modelo físico.
