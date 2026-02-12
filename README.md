## 📋 Dashboard de Tarefas — Lista & Kanban

Aplicação Full Stack para gerenciamento de tarefas, com visualização em lista e Kanban, Drag & Drop persistente, filtros, busca, feedback visual e API própria documentada.

Projeto desenvolvido com foco em boas práticas, arquitetura limpa, experiência do usuário e integração real Frontend ↔ Backend, ideal para portfólio de Desenvolvedor Full Stack Júnior.

## 🚀 Demonstração (Deploy)

**🌐 Frontend (Vercel)*
👉 https://project2-dashboard-api.vercel.app

**🔧 Backend (Render)*
👉 https://project2-dashboardapi.onrender.com

**📘 Swagger / Docs da API*
👉 https://project2-dashboardapi.onrender.com/docs/

## 🧠 Funcionalidades
**✅ Backend**

- CRUD completo de tarefas
- Validação de dados (título, status, prioridade)
- Filtros por:

Status (todo | doing | done)

Prioridade (low | medium | high)

Busca por texto (título e descrição)

- Paginação
- API REST documentada com Swagger
- Prisma ORM
- Banco de dados SQLite
- Health check (/health)

**✅ Frontend**

- Dashboard moderno
- Visualização em Lista (tabela)
- Visualização Kanban
- Drag & Drop entre colunas (persistente no backend)
- Criar tarefa (modal)
- Editar tarefa clicando no título
- Excluir tarefa com confirmação
- Filtros e busca em tempo real

**Feedback visual:*

- Loading
- Toasts de sucesso/erro
- Integração total com API REST

## 🛠️ Tecnologias Utilizadas

**Backend**

- Node.js
- Express
- Prisma ORM
- SQLite
- Swagger (swagger-ui-express)
- CORS
- Dotenv

**Frontend**

- React
- Vite
- Axios
- @hello-pangea/dnd (Drag & Drop)
- react-hot-toast

## 🏛️ Estrutura do Projeto

```
Projeto2/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── docs/
│   │   ├── lib/
│   │   └── server.js
│   ├── prisma/
│   ├── prisma.config.ts
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md

```

## ▶️ Como rodar o projeto localmente
**Pré-requisitos**

**- Node.js (v18+ recomendado)**
**- npm**

## 🔧Backend

*cd backend*
npm install*
*npx prisma generate*
*npx prisma migrate dev*
*npm run dev*



**API disponível em:**

http://localhost:5000


**Endpoints principais:**

- Health: /health
- Tarefas: /tasks
- Docs: /docs

## 🎨 Frontend

*cd frontend*
*npm install*
*npm run dev*


**Aplicação disponível em:**

http://localhost:5173

## 🔄 Variáveis de Ambiente

*Backend (.env)*
*PORT=5000*
*NODE_ENV=development*
*DATABASE_URL=file:./dev.db*
*Frontend (.env)*
*VITE_API_URL=http://localhost:5000*

## 🌍 Deploy
**Backend (Render)**

*Root Directory: backend*

Build Command:

npm install && npx prisma generate && npx prisma migrate deploy

*Start Command:*

npm start

**Frontend (Vercel)**

*Framework: Vite*

*Root Directory: frontend*

*Environment Variable:*

VITE_API_URL=https://project2-dashboardapi.onrender.com


## 📝 Observação

Este projeto foi desenvolvido como parte do meu processo de aprendizado prático em desenvolvimento web full stack, simulando um cenário real de produto, desde a API até o deploy em produção.
