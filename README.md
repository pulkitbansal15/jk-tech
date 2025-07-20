# 📟 Document Ingestion API

A modular NestJS backend for managing users, JWT-based authentication, role-based access control, and a document ingestion pipeline.

---

## 🚀 Tech Stack

* **NestJS** - Modular and extensible Node.js framework
* **TypeORM** - ORM for TypeScript and PostgreSQL
* **PostgreSQL** - Relational Database
* **Docker & Docker Compose** - For containerized development
* **JWT** - Secure authentication mechanism
* **Jest** - Unit testing

---

## 📁 Project Structure

```
src/
├── auth/             # Authentication (JWT strategy, login, register, guards)
├── users/            # User entity, roles, service
├── documents/        # Document upload, listing, removal
├── ingestion/        # Document ingestion start & status
├── main.ts           # Entry point
└── app.module.ts     # Root module
test/ # I have added tests in both test folder as well as in src folder

```

---

## 📦 Setup Locally

### ✅ Requirements

* Node.js v18+
* Docker & Docker Compose (optional if DB runs locally)
* PostgreSQL (or use Docker setup)

### 🛠️ Environment Variables

Create a `.env` file at the root:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=jk_tech
JWT_SECRET=your_jwt_secret
```

---

## 🐳 Docker Setup

### Step 1: Create a `.env` file for Docker Compose

```env
POSTGRES_DB=jk_tech
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
```

### Step 2: Start Containers

```bash
docker-compose up --build
```

To stop:

```bash
docker-compose down -v
```

---

## 🧪 Running Tests

Run Jest test suites locally:

```bash
npm install
npm run test
```
to run test cases that are present in test/ folder
npx jest --config ./jest.unit.json

Run in watch mode:

```bash
npm run test:watch
```

---

## 🔐 Auth Endpoints

| Method | Endpoint         | Description         | Auth |
| ------ | ---------------- | ------------------- | ---- |
| POST   | `/auth/register` | Register a new user | ❌    |
| POST   | `/auth/login`    | Login and get token | ❌    |

---

## 👤 Users

| Method | Endpoint    | Description      | Auth Required |
| ------ | ----------- | ---------------- | ------------- |
| GET    | `/users` | Get all users | ✅ (Only user with admin role can use this)            |

---

## 📄 Documents

| Method | Endpoint            | Description         | Role Required  |
| ------ | ------------------- | ------------------- | -------------- |
| POST   | `/documents/upload` | Upload new document | `editor`       |
| GET    | `/documents`        | List all documents  | any            |
| DELETE | `/documents/:id`    | Delete a document   | `editor` |

---

## ⚙️ Ingestion

| Method | Endpoint            | Description             | Role Required |
| ------ | ------------------- | ----------------------- | ------------- |
| POST   | `/ingestion/start`  | Start ingestion process | `editor`      |
| GET    | `/ingestion/status` | Get ingestion status    | any           |

---

## 🛡️ Authentication & Authorization

* **JWT Auth**: Secure login using `Authorization: Bearer <token>`
* **Roles**: Role-based guards using a custom `@Roles()` decorator.
* Supported Roles: `admin`, `editor`, `viewer`

---

## 🧠 Sample JWT Flow

1. Register via `/auth/register`
2. Login via `/auth/login` → receive token
3. Use token in headers:

```http
Authorization: Bearer <your_token_here>
```

---
