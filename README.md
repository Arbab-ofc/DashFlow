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

## Features
- User authentication (signup/login)
- JWT-based authorization
- Task CRUD operations
- Task search and filtering
- Responsive design
- Modern UI with icons only (no emojis)

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

## License
MIT License
