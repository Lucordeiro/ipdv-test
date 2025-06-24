
# Sistema de Gestão de Usuários e Cargos

Este projeto é um sistema fullstack desenvolvido para gerenciar usuários e seus respectivos cargos (roles). 

- 🖥️ **Backend:** Node.js + Express + Prisma + PostgreSQL (TypeScript, padrão SOLID)
- 🌐 **Frontend:** Vue 3 + Vite + Vuetify + TypeScript

Obs: Lembrando que este projeto é bem básico apenas para demonstração básica de como seria a arquitetura de desenvolvimento do sistema. Algumas coisas importantes como testes automatizados, conteinerização e logs, nao foram aplicados por conta da falta de tempo e por ser apenas um teste. 
---

## 🚀 Funcionalidades

- ✅ Autenticação com JWT (expira em 60 minutos)
- ✅ Cadastro de usuários e cargos
- ✅ Vinculação de usuários aos cargos
- ✅ Edição de usuários e cargos
- ✅ Desativação de usuários
- ✅ Login e Logout
- ✅ Filtros por cargo na listagem de usuários

---

## 📂 Estrutura do Projeto

├── backend  
│ ├── prisma  
│ │ ├── migrations  
│ │ ├── schema.prisma  
│ │ └── seed.ts  
│ ├── src  
│ │ ├── controllers  
│ │ ├── repositories  
│ │ ├── services  
│ │ ├── middlewares  
│ │ ├── routes  
│ │ ├── prisma  
│ │ └── server.ts  
│ ├── package.json  
│ └── README.md  
└── frontend  
├── src  
│ ├── components  
│ ├── layouts  
│ ├── pages  
│ ├── router  
│ ├── services  
│ ├── stores  
│ └── App.vue  
├── public  
├── vite.config.ts  
├── package.json  
└── README.md


---

## ⚙️ Tecnologias Utilizadas

### Backend:
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT
- Bcrypt
- SOLID Pattern

### Frontend:
- Vue 3 (Composition API)
- Vite
- Vuetify 3
- Pinia (Store)
- Axios
- TypeScript

---

## 🏗️ Instalação e Execução

### 🚩 Pré-requisitos:
- Node.js >= 18
- PostgreSQL >= 13

---
## 🔥 Banco de dados (DOCKER)
obs: como eu tenho docker na maquina aproveitei para fazer um a mini infra com uma instancia do postgreSQL server, e o pgpadmin como client. Caso tenha o docker é só seguir os passos abaixo, se nao precisa ter o postgre instalado

### 1️⃣ Acesse a pasta infra:

```bash
cd infra
```
### 2️⃣ Coloque os containers para rodar:
```bash
docker-compose up
```


## 🔥 Backend

### 1️⃣ Acesse a pasta do backend:

```bash
cd backend
```
### 2️⃣ Instale as dependências:
```bash
npm install
```
### 3️⃣ Configure o arquivo `.env`:
```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/ipdv-db?schema=public"
JWT_SECRET="ipdv-secret-key"
JWT_EXPIRES="1h"
```

### 4️⃣ Rode as migrations e o seed:
```bash
npm run prisma:migrate
npm run prisma:seed
```
### 5️⃣ Inicie o backend:
```bash
npm run dev
```
Acesse: [http://localhost:3000](http://localhost:3000)

## 🌐 Frontend

### 1️⃣ Acesse a pasta do frontend:
```bash
`cd frontend`
``` 
### 2️⃣ Instale as dependências:

```bash
`npm install` 
``` 
### 4️⃣ Inicie o frontend:
```bash
`npm run dev` 
``` 
Acesse: [http://localhost:5173](http://localhost:5173)

----------

## 🔑 Login padrão (dados do seed)

-   **Email:** `user@ipdv.com`
    
-   **Senha:** `admin123`
