# Sistema de Controle de Gastos Residenciais

![.NET](https://img.shields.io/badge/.NET-10-512BD4?style=flat&logo=dotnet&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat&logo=sqlite&logoColor=white)

Sistema web full stack para controle de gastos residenciais, permitindo o cadastro de pessoas, registro de transações financeiras e consulta de totais consolidados.

---

## Tecnologias Utilizadas

**Backend**
- .NET 10 / C#
- Entity Framework Core
- SQLite

**Frontend**
- React 19 + TypeScript
- Vite
- Bootstrap 5
- Axios

---

## Estrutura do Projeto

```
Desafio Tecnico/
├── SistemaControle/        # API REST em .NET
│   ├── Controller/         # Endpoints da API
│   ├── Service/            # Regras de negócio
│   ├── Model/              # Entidades do banco de dados
│   ├── DTOs/               # Objetos de transferência de dados
│   ├── Interface/          # Contratos dos serviços
│   ├── Data/               # Contexto do Entity Framework
│   └── Migrations/         # Migrações do banco de dados
│
└── frontend/               # Aplicação React
    └── src/
        ├── pages/          # Telas da aplicação
        ├── components/     # Componentes reutilizáveis
        ├── services/       # Comunicação com a API
        └── types/          # Interfaces TypeScript
```

---

## Como Rodar o Projeto

### Pré-requisitos

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (versão 18 ou superior)

---

### Backend

```bash
# Acesse a pasta do backend
cd SistemaControle

# Restaure as dependências
dotnet restore

# Execute a aplicação
dotnet run
```

A API estará disponível em `http://localhost:5291`.

---

### Frontend

```bash
# Acesse a pasta do frontend
cd frontend

# Instale as dependências
npm install

# Execute a aplicação
npm run dev
```

O frontend estará disponível em `http://localhost:5173`.

> Certifique-se de que o backend está rodando antes de iniciar o frontend.

---

## Instruções de Uso

Com os dois projetos rodando, acesse `http://localhost:5173` no navegador e siga o fluxo abaixo:

1. **Cadastre uma pessoa** — acesse a aba *Pessoas*, preencha o nome e a idade e clique em Salvar
2. **Registre transações** — acesse a aba *Transações*, selecione a pessoa, preencha a descrição, o valor e o tipo (Receita ou Despesa) e clique em Salvar
   - Pessoas menores de 18 anos só podem registrar **despesas** — a opção de receita será bloqueada automaticamente
3. **Consulte os totais** — acesse a aba *Totais* para visualizar o resumo financeiro de cada pessoa e o total geral

> Para excluir uma pessoa, clique no botão **Excluir** na tabela da aba *Pessoas*. Todas as transações vinculadas a ela serão removidas automaticamente.

---

## Funcionalidades Implementadas

- **Cadastro de Pessoas** — criação, listagem e exclusão
- **Cadastro de Transações** — criação e listagem com nome da pessoa vinculada
- **Consulta de Totais** — exibe receitas, despesas e saldo por pessoa, além do total geral
- **Feedback de erros** — mensagens de erro exibidas ao usuário em caso de falha na API
- **Interface responsiva** — compatível com dispositivos móveis

---

## Regras de Negócio

- Ao excluir uma pessoa, **todas as suas transações são removidas automaticamente** (cascade delete)
- Pessoas **menores de 18 anos** só podem cadastrar **despesas** — a opção de receita é bloqueada no frontend e validada no backend
- O identificador de cada pessoa e transação é **gerado automaticamente** pela API

---

## Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/pessoa` | Lista todas as pessoas |
| `POST` | `/api/pessoa` | Cadastra uma nova pessoa |
| `DELETE` | `/api/pessoa/{id}` | Remove uma pessoa e suas transações |
| `GET` | `/api/transacao` | Lista todas as transações |
| `POST` | `/api/transacao` | Cadastra uma nova transação |
| `GET` | `/api/transacao/totais` | Retorna os totais consolidados |

---

## Desenvolvido por

**João Pedro Rodrigues** — 2026
