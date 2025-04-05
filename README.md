# Requisitos para API de Resenhas de Filmes

## 📌 Requisitos Funcionais

### 🔐 Autenticação & Usuários

| ID   | Descrição                                         |
| ---- | ------------------------------------------------- |
| RF01 | Cadastro de usuários (nome, email, senha, avatar) |
| RF02 | Autenticação JWT com refresh tokens               |
| RF03 | Perfis de usuário (comum, crítico, admin)         |
| RF04 | Recuperação de senha via email                    |
| RF05 | Atualização de perfil                             |

### 🎬 Gestão de Filmes

| ID   | Descrição                                           |
| ---- | --------------------------------------------------- |
| RF06 | CRUD completo de filmes (admin apenas)              |
| RF07 | Integração com TMDB/OMDb para dados automáticos     |
| RF08 | Busca avançada com filtros (gênero, ano, avaliação) |
| RF09 | Sistema de categorias/coleções                      |

### ✍️ Resenhas & Avaliações

| ID   | Descrição                                            |
| ---- | ---------------------------------------------------- |
| RF10 | Criar/editar resenhas com nota (1-5) e spoiler alert |
| RF11 | Sistema de likes e comentários                       |
| RF12 | Cálculo automático de rating médio por filme         |
| RF13 | Denúncia de conteúdo inapropriado                    |

### 🤝 Interações Sociais

| ID   | Descrição                             |
| ---- | ------------------------------------- |
| RF14 | Seguir usuários e feed de atividades  |
| RF15 | Criar listas personalizadas de filmes |
| RF16 | Sistema de mensagens privadas         |

### ⚙️ Administração

| ID   | Descrição                                 |
| ---- | ----------------------------------------- |
| RF17 | Painel admin com estatísticas e moderação |
| RF18 | Verificação de contas de críticos         |
| RF19 | Sistema de banimento de usuários          |

## 🛠️ Requisitos Não-Funcionais

### Segurança

| ID    | Descrição                                  |
| ----- | ------------------------------------------ |
| RNF01 | Autenticação JWT com tempo de expiração    |
| RNF02 | Rate limiting (100 reqs/min por IP)        |
| RNF03 | Validação e sanitização de todos os inputs |
| RNF04 | Hash de senhas com bcrypt                  |

### Performance

| ID    | Descrição                                         |
| ----- | ------------------------------------------------- |
| RNF05 | Tempo de resposta <500ms para 95% das requisições |
| RNF06 | Cache Redis para endpoints de listagem            |
| RNF07 | Paginação padrão em endpoints de listas           |

### Disponibilidade

| ID    | Descrição                           |
| ----- | ----------------------------------- |
| RNF08 | Uptime de 99.5%                     |
| RNF09 | Backup diário dos dados             |
| RNF10 | Monitoramento com New Relic/DataDog |

### Escalabilidade

| ID    | Descrição                                                   |
| ----- | ----------------------------------------------------------- |
| RNF11 | Arquitetura stateless                                       |
| RNF12 | Design para fácil horizontal scaling                        |
| RNF13 | Filas para processamento assíncrono (envio de emails, etc.) |

### Usabilidade

| ID    | Descrição                               |
| ----- | --------------------------------------- |
| RNF14 | Documentação Swagger/OpenAPI completa   |
| RNF15 | Versionamento da API (v1/, v2/)         |
| RNF16 | Mensagens de erro claras e padronizadas |

### Regra de Negócio

Um usuário não pode seguir ele mesmo.
Não deve ser possível seguir uma pessoa várias vezes.
As mensagens enviadas de usuario a usuario devem estar criptografadas no banco.

## 📦 Dependências Principais

- Express.js
- TypeScript
- PostgreSQL/MySQL
- Redis (cache)
- JWT (autenticação)
- Nodemailer (emails)
- Jest (testes)
