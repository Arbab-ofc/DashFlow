<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://capsule-render.vercel.app/api?type=rect&color=0:0f172a,100:1e293b&height=120&section=header&text=DashFlow&fontColor=ffffff&fontSize=48&animation=fadeIn" />
    <img src="https://capsule-render.vercel.app/api?type=rect&color=0:3B82F6,100:8B5CF6&height=120&section=header&text=DashFlow&fontColor=ffffff&fontSize=48&animation=fadeIn" alt="DashFlow" />
  </picture>
</div>

<div align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Space+Grotesk&weight=600&size=20&duration=2500&pause=800&color=3B82F6&center=true&vCenter=true&width=600&lines=Secure+task+management;Modern+React+and+TypeScript+stack;Prisma+powered+PostgreSQL" alt="DashFlow typing banner" />
</div>

<div align="center">
  <a href="https://react.dev/">
    <img src="https://img.shields.io/badge/React-18+-0ea5e9?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-Strict-2563eb?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/TailwindCSS-3-0f766e?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
  </a>
  <a href="https://mui.com/">
    <img src="https://img.shields.io/badge/MUI-5-1e40af?style=for-the-badge&logo=mui&logoColor=white" alt="Material UI" />
  </a>
  <a href="https://expressjs.com/">
    <img src="https://img.shields.io/badge/Express-4-334155?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  </a>
  <a href="https://www.prisma.io/">
    <img src="https://img.shields.io/badge/Prisma-5-0f172a?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  </a>
  <a href="https://www.postgresql.org/">
    <img src="https://img.shields.io/badge/PostgreSQL-14-1f4b99?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  </a>
</div>

# DashFlow - Task Management Application

## Table of Contents
- Overview
- Features
- Tech Stack
- Prerequisites
- Installation
- Environment Variables
- Database Setup
- Running the Application
- API Documentation
- Frontend Structure
- Backend Structure
- Deployment
- Scaling Considerations
- Security
- Contributing
- License

## Overview
DashFlow is a production-grade task management application that provides secure authentication and full task lifecycle management with a modern, responsive interface.

## System Map
```mermaid
flowchart LR
  U[User] --> FE[React + TypeScript Frontend]
  FE -->|Axios + JWT| BE[Express + Prisma API]
  BE --> DB[(PostgreSQL)]
  FE -->|Profile + Password updates| BE
```

## Authentication Workflow
```mermaid
sequenceDiagram
  participant User
  participant UI as Frontend
  participant API as Backend API
  participant DB as PostgreSQL

  User->>UI: Submit signup/login form
  UI->>API: POST /api/v1/auth/signup or /login
  API->>DB: Create user or verify password
  API-->>UI: Return JWT + user profile
  UI->>UI: Store token and redirect to dashboard
  User->>UI: Update profile or password
  UI->>API: PUT /api/v1/me or /api/v1/me/password
  API->>DB: Update user record
  API-->>UI: Return updated profile or success
```

## Task CRUD Workflow
```mermaid
flowchart TD
  A[Dashboard] --> B{Action}
  B -->|Create| C[POST /api/v1/tasks]
  B -->|Read| D[GET /api/v1/tasks]
  B -->|Update| E[PUT /api/v1/tasks/:id]
  B -->|Delete| F[DELETE /api/v1/tasks/:id]
  C --> G[Refresh task list]
  D --> G
  E --> G
  F --> G
```

## Data Model (ER Diagram)
```mermaid
flowchart LR
  USER[User\nid: Int\nemail: String\nname: String\npassword: String\ncreatedAt: DateTime\nupdatedAt: DateTime]
  TASK[Task\nid: Int\ntitle: String\ndescription: String?\nstatus: String\nuserId: Int\ncreatedAt: DateTime\nupdatedAt: DateTime]
  USER -->|1..many| TASK
```

## Error Handling Flow
```mermaid
flowchart TD
  A[Client request] --> B{Validation}
  B -->|Invalid| C[400 Validation error]
  B -->|Valid| D{Auth required?}
  D -->|No| E[Controller]
  D -->|Yes| F{JWT valid?}
  F -->|No| G[401 Unauthorized]
  F -->|Yes| E[Controller]
  E --> H{Service/DB}
  H -->|Success| I[200/201 Response]
  H -->|Failure| J[Handled error]
  J --> K[Error middleware]
  K --> L[Consistent error response]
```

## Request Lifecycle
```mermaid
sequenceDiagram
  participant UI as Frontend
  participant API as Express API
  participant DB as PostgreSQL

  UI->>API: HTTP request + JWT
  API->>API: Middleware (CORS, auth, validation)
  API->>DB: Prisma query
  DB-->>API: Result
  API-->>UI: JSON response
```

## Features
- User authentication (signup/login)
- JWT-based authorization
- Task CRUD operations
- Task search and filtering
- Responsive design
- Modern UI with icons only (no emojis)
- Luxury public landing page
- Profile management with password update

## Tech Stack

### Frontend
- React 18+
- TypeScript
- TailwindCSS
- Material UI
- React Router
- Axios
- React Hook Form
- Lucide Icons

### Backend
- Node.js
- Express
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT
- Argon2
- Zod

## Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

## Installation

### Clone the repository
```bash
git clone https://github.com/Arbab-ofc/DashFlow.git
cd DashFlow
```

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npx prisma migrate dev
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
npm start
```

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://dashflow_user:dashflow_pass@localhost:5432/dashflow
JWT_SECRET=your-super-secret-jwt-key
PORT=5050
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5050/api/v1
```

## Database Setup

### Create database and user (PostgreSQL)
```bash
psql postgres
```

```sql
CREATE USER dashflow_user WITH PASSWORD 'dashflow_pass';
CREATE DATABASE dashflow OWNER dashflow_user;
\q
```

### Run migrations
```bash
cd backend
npx prisma migrate dev --name init
npx prisma generate
```

## Running the Application
1. Start the backend: `npm run dev` in `backend/`.
2. Start the frontend: `npm start` in `frontend/`.
3. Open `http://localhost:3000`.

## UI Notes
- Public landing page uses the luxury hero layout.
- Auth pages and dashboard use the hero header styling.
- Profile page includes password update with show/hide toggles.

## API Documentation

### Auth Endpoints

#### POST /api/v1/auth/signup
Create new user account

Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

Success Response (201):
```json
{
  "success": true,
  "data": {
    "token": "jwt-token-here",
    "user": {
      "id": 1,
      "email": "john@example.com",
      "name": "John Doe"
    }
  }
}
```

#### POST /api/v1/auth/login
Login existing user

Request Body:
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

### User Endpoints

#### GET /api/v1/me
Get current user profile (requires authentication)

#### PUT /api/v1/me
Update current user profile

Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

#### PUT /api/v1/me/password
Update account password

Request Body:
```json
{
  "newPassword": "NewSecurePass123",
  "confirmPassword": "NewSecurePass123"
}
```

### Task Endpoints

#### POST /api/v1/tasks
Create new task

Request Body:
```json
{
  "title": "Complete project",
  "description": "Finish the DashFlow application",
  "status": "PENDING"
}
```

#### GET /api/v1/tasks
Get all tasks for current user

Query params:
```
?search=keyword&status=PENDING&page=1&limit=10
```

#### GET /api/v1/tasks/:id
Get single task

#### PUT /api/v1/tasks/:id
Update task

#### DELETE /api/v1/tasks/:id
Delete task

## Frontend Structure
```
frontend/
  src/
    components/
      auth/
      common/
      layout/
      tasks/
    context/
    hooks/
    pages/
    routes/
    services/
    types/
    utils/
    App.tsx
    index.tsx
```

## Backend Structure
```
backend/
  prisma/
    schema.prisma
    migrations/
  src/
    controllers/
    middlewares/
    routes/
    services/
    validators/
    utils/
    config/
    app.ts
    server.ts
```

## Deployment

### Backend (Render/Railway/Heroku)
- Set environment variables (`DATABASE_URL`, `JWT_SECRET`, `PORT`).
- Run Prisma migrations in the build or release phase.
- Use `npm run build` and `npm start` in production.

### Frontend (Vercel/Netlify)
- Set `REACT_APP_API_URL` to the backend URL.
- Build command: `npm run build`.
- Output directory: `build`.

## Scaling Considerations
- Add pagination and indexed queries (already indexed on userId and status).
- Use connection pooling for PostgreSQL.
- Add caching (Redis) for frequently accessed data.
- Use a CDN for static assets.
- Add background jobs for heavy tasks.

## Security
- Password hashing with Argon2
- JWT authentication
- Input validation with Zod
- Prisma ORM prevents SQL injection
- CORS configured for allowed origins
- Avoid logging sensitive data

## Testing
No automated tests are included yet. Add tests with Jest and Supertest for API routes.

## Sample Credentials
Email: demo@dashflow.com
Password: Demo123456

## Contributing
1. Fork the repository.
2. Create a feature branch.
3. Commit changes with clear messages.
4. Open a pull request.

## Contact
[![GitHub](https://img.shields.io/badge/GitHub-Arbab--ofc-0f172a?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Arbab-ofc)
[![Website](https://img.shields.io/badge/Website-arbabofc.me-3B82F6?style=for-the-badge&logo=google-chrome&logoColor=white)](https://www.arbabofc.me)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-arbab--ofc-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/arbab-ofc)
