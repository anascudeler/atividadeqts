# Requisitos Não Funcionais

## 1. Objetivo

Definir as características de qualidade da solução, incluindo segurança, desempenho, disponibilidade, confiabilidade, usabilidade, compatibilidade, escalabilidade, manutenibilidade e conformidade.

## 2. Segurança

- RNF-SEG-001: o acesso ao sistema deverá ocorrer exclusivamente mediante autenticação com e-mail e senha.
- RNF-SEG-002: as senhas deverão ser armazenadas com algoritmo criptográfico seguro.
- RNF-SEG-003: todas as funcionalidades deverão validar permissões com base em RBAC.
- RNF-SEG-004: dados sensíveis, como CPF e RG, deverão ser protegidos contra exposição indevida.
- RNF-SEG-005: toda comunicação entre cliente e servidor deverá ocorrer via HTTPS.
- RNF-SEG-006: sessões autenticadas deverão expirar automaticamente após período configurável de inatividade.
- RNF-SEG-007: tentativas de autenticação deverão ser registradas em log.

## 3. Auditoria e Rastreabilidade

- RNF-AUD-001: toda alteração em informações relevantes deverá registrar auditoria.
- RNF-AUD-002: o histórico deverá permitir identificar usuário, data, hora, operação e estado anterior e posterior.
- RNF-AUD-003: registros históricos não poderão ser alterados por usuários da aplicação.
- RNF-AUD-004: evidências deverão permanecer disponíveis para consulta durante o período de retenção definido pela empresa.

## 4. Disponibilidade

- RNF-DISP-001: o sistema deverá permanecer disponível durante o horário de funcionamento da empresa.
- RNF-DISP-002: falhas inesperadas não deverão comprometer os registros já persistidos.

## 5. Desempenho

- RNF-DES-001: o tempo médio de resposta das consultas deverá ser inferior a 2 segundos em condições normais.
- RNF-DES-002: operações de cadastro deverão responder em menos de 3 segundos.
- RNF-DES-003: a emissão de certificados poderá ocorrer de forma assíncrona quando houver grande volume de participantes.

## 6. Confiabilidade

- RNF-CONF-001: o sistema deverá impedir duplicidade de registros considerados únicos.
- RNF-CONF-002: nenhuma operação deverá deixar registros parcialmente gravados em caso de falha.

## 7. Integridade dos Dados

- RNF-INT-001: os relacionamentos entre entidades deverão respeitar integridade referencial.
- RNF-INT-002: registros inativados deverão permanecer disponíveis para consultas históricas.
- RNF-INT-003: treinamentos encerrados não poderão sofrer alterações.
- RNF-INT-004: assinaturas digitais registradas não poderão ser substituídas após o encerramento.

## 8. Usabilidade

- RNF-USA-001: a interface deverá priorizar simplicidade operacional.
- RNF-USA-002: as operações mais frequentes deverão exigir o menor número possível de interações.
- RNF-USA-003: o sistema deverá ser responsivo para uso em computadores e tablets.
- RNF-USA-004: as mensagens do sistema deverão ser claras e objetivas.

## 9. Compatibilidade

- RNF-COMP-001: o sistema deverá ser compatível com navegadores modernos como Chrome, Edge e Firefox.
- RNF-COMP-002: o sistema deverá funcionar em tablets utilizados durante a coleta das assinaturas.

## 10. Escalabilidade

- RNF-ESC-001: a arquitetura deverá permitir inclusão de novos módulos sem reestruturação completa.
- RNF-ESC-002: novos perfis, permissões e funcionalidades deverão poder ser adicionados sem alterações significativas na arquitetura.

## 11. Manutenibilidade

- RNF-MAN-001: a solução deverá possuir arquitetura modular.
- RNF-MAN-002: as regras de negócio deverão estar centralizadas na camada de domínio.
- RNF-MAN-003: interface, regras de negócio e persistência deverão permanecer desacopladas.
- RNF-MAN-004: todas as operações deverão possuir tratamento padronizado de erros.

## 12. Portabilidade

- RNF-PORT-001: o sistema deverá ser executado em ambiente Linux.
- RNF-PORT-002: a aplicação deverá ser acessível por navegador web, sem instalação local.

## 13. Backup

- RNF-BKP-001: a política de backup da infraestrutura será de responsabilidade da empresa contratante.
- RNF-BKP-002: a aplicação deverá continuar operando normalmente dentro das premissas de backup da infraestrutura.

## 14. Evolução

- RNF-EVO-001: a solução deverá permitir evolução para múltiplas empresas, treinamentos online, avaliações, integração com ERP, notificações, dashboard executivo e aplicativo móvel.

## 15. Conformidade

- RNF-CFG-001: o sistema deverá armazenar evidências suficientes para comprovação dos treinamentos.
- RNF-CFG-002: as informações registradas deverão permitir rastrear quem realizou cada operação, quando ocorreu e quais dados foram alterados.
- RNF-CFG-003: os registros históricos deverão ser preservados após a conclusão dos treinamentos.
- RNF-CFG-004: os documentos emitidos deverão conter identificador único para validação futura.
- RNF-CFG-005: as evidências associadas a um treinamento deverão permanecer vinculadas ao respectivo registro durante todo o período de retenção.
