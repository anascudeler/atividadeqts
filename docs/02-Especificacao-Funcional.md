# Especificação Funcional

## 1. Introdução

Este documento formaliza o comportamento esperado do Sistema de Gestão de Treinamentos. Seu conteúdo registra, de maneira clara e rastreável, as diretrizes de operação da solução para atendimento ao processo de organização, execução, comprovação e consulta dos treinamentos presenciais da empresa.

## 2. Objetivo do Sistema

O sistema tem por finalidade controlar o ciclo completo dos treinamentos presenciais, contemplando cadastro, planejamento, execução, coleta de assinaturas, armazenamento de evidências, emissão de certificados e consulta histórica.

## 3. Objetivo deste Documento

Esta especificação constitui a referência oficial para desenvolvimento, testes, homologação, aceite e evoluções futuras. Toda funcionalidade não descrita neste conjunto documental deverá ser tratada como fora de escopo da primeira versão.

## 4. Escopo da Primeira Versão

A primeira versão contempla os seguintes domínios funcionais:

- controle de usuários;
- controle de perfis e permissões;
- cadastro de funcionários;
- cadastro de instrutores;
- cadastro de treinamentos;
- associação de participantes, responsáveis e instrutores;
- assinatura digital;
- registro de evidências;
- emissão de certificados;
- consulta de histórico e auditoria.

## 5. Público-Alvo

A aplicação será utilizada exclusivamente por colaboradores autorizados da empresa, incluindo administradores, responsáveis por treinamentos, técnicos de segurança do trabalho e supervisores autorizados. Funcionários participantes e instrutores externos não terão acesso direto ao sistema, exceto no momento da assinatura presencial, quando aplicável.

## 6. Glossário

- Usuário: pessoa autorizada a acessar a aplicação.
- Funcionário: colaborador da empresa que pode participar de treinamentos.
- Instrutor: pessoa responsável por ministrar treinamentos, interna ou externa.
- Responsável pelo treinamento: usuário que administra o treinamento.
- Evidência: qualquer registro que comprove a realização do treinamento.
- Treinamento: evento presencial de capacitação realizado em uma única data.

## 7. Visão Geral da Solução

A solução foi estruturada em módulos funcionais independentes e integrados. Cada módulo atende a uma responsabilidade específica, reduzindo o acoplamento e facilitando a manutenção e a evolução futuras.

## 8. Arquitetura Funcional

Os módulos principais da solução são os seguintes:

- Usuários;
- Perfis de acesso;
- Funcionários;
- Instrutores;
- Treinamentos.

Esses módulos se conectam por meio das regras de negócio e das entidades compartilhadas do domínio.

## 9. Princípios Funcionais

- Integridade dos dados.
- Rastreabilidade das operações.
- Segurança baseada em perfis.
- Auditabilidade dos registros.
- Simplicidade operacional.
- Evolução modular da solução.

## 10. Controle de Acesso

O acesso será baseado em RBAC. As permissões não serão atribuídas diretamente ao usuário, mas por meio dos perfis aos quais ele estiver vinculado. Um mesmo usuário poderá acumular permissões provenientes de múltiplos perfis.

## 11. Regras Gerais de Comportamento

- apenas usuários autenticados poderão acessar a aplicação;
- usuários inativos não poderão autenticar-se;
- um treinamento encerrado não poderá ser alterado;
- as evidências e os certificados deverão permanecer disponíveis para consulta;
- todas as ações relevantes deverão ser auditadas.

## 12. Critérios Gerais da Solução

A interface deverá ser objetiva, responsiva e adequada ao uso em computador e tablet. As mensagens do sistema deverão ser claras, e toda operação crítica deverá registrar histórico de auditoria.

## 13. Referências Complementares

Os detalhes completos das regras de negócio, requisitos funcionais, requisitos não funcionais, modelo de dados, fluxos e anexos estão descritos nos documentos complementares desta pasta.
