# Backend API Documentation

## Overview

The Legal_Lense backend is a Node.js + Express server that handles:
- User authentication (register/login)
- Case management (CRUD operations)
- RESTful API endpoints

**Base URL:** `http://localhost:5000/api`

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Backend Only
```bash
npm run dev:backend
```
Server will start on `http://localhost:5000`

### 3. Run Frontend + Backend Together
```bash
npm run dev:all
```
- Frontend: `http://localhost:5173` (or next available port)
- Backend: `http://localhost:5000`

---

## API Endpoints

### Authentication

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}

Response (201):
{
  "message": "User registered successfully",
  "user": {
    "id": "abc123def456",
    "email": "user@example.com"
  }
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}

Response (200):
{
  "message": "Login successful",
  "user": {
    "id": "abc123def456",
    "email": "user@example.com"
  }
}
```

---

### Cases

#### Get All Cases for User
```
GET /api/cases/:userId

Response (200):
{
  "cases": [
    {
      "id": "case123",
      "userId": "user456",
      "scenario": "Recovery of debt from a company...",
      "summary": "Based on contract law...",
      "applicableLaws": [...],
      "proceduralSteps": [...],
      "sources": [...],
      "timestamp": 1707510000000
    }
  ]
}
```

#### Create Case
```
POST /api/cases
Content-Type: application/json

{
  "userId": "abc123def456",
  "scenario": "Legal scenario description",
  "summary": "AI analysis summary",
  "applicableLaws": [
    {
      "act": "Contract Act, 1872",
      "section": "Section 73",
      "explanation": "..."
    }
  ],
  "proceduralSteps": ["Step 1", "Step 2"],
  "sources": [
    {
      "title": "Source name",
      "uri": "https://example.com"
    }
  ]
}

Response (201):
{
  "message": "Case created successfully",
  "case": {
    "id": "case123",
    "userId": "abc123def456",
    ...
  }
}
```

#### Delete Case
```
DELETE /api/cases/:caseId

Response (200):
{
  "message": "Case deleted successfully"
}
```

#### Delete All Cases for User
```
DELETE /api/cases/user/:userId

Response (200):
{
  "message": "5 cases deleted successfully"
}
```

---

### Health Check

#### Check Backend Status
```
GET /api/health

Response (200):
{
  "status": "Backend is running",
  "timestamp": "2026-02-10T12:34:56.789Z",
  "userCount": 5,
  "caseCount": 12
}
```

---

## Error Responses

### 400 - Bad Request
```json
{
  "error": "Email and password required"
}
```

### 401 - Unauthorized
```json
{
  "error": "Invalid email or password"
}
```

### 404 - Not Found
```json
{
  "error": "Case not found"
}
```

### 409 - Conflict
```json
{
  "error": "User already exists"
}
```

---

## Database Structure

### Users Collection
```
{
  "id": string (unique),
  "email": string,
  "password": string
}
```

### Cases Collection
```
{
  "id": string (unique),
  "userId": string (reference to user),
  "scenario": string,
  "summary": string,
  "applicableLaws": [
    {
      "act": string,
      "section": string,
      "explanation": string
    }
  ],
  "proceduralSteps": string[],
  "sources": [
    {
      "title": string,
      "uri": string
    }
  ],
  "timestamp": number
}
```

---

## Running Both Frontend & Backend

```bash
# Terminal 1 - Run everything together
npm run dev:all

# OR run separately in different terminals:

# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run dev:backend
```

---

## Frontend Integration

The frontend uses `BackendAPIService` to communicate with the backend:

```typescript
import { BackendAPIService } from './services/backendAPIService';

// Register
const result = await BackendAPIService.register(email, password);

// Login
const user = await BackendAPIService.login(email, password);

// Get cases
const cases = await BackendAPIService.getCases(userId);

// Create case
const caseId = await BackendAPIService.createCase(userId, analysis);

// Delete case
await BackendAPIService.deleteCase(caseId);
```

---

## Environment Variables

Create `.env` file in root:
```
PORT=5000
NODE_ENV=development
```

Frontend can access backend via:
```
VITE_API_URL=http://localhost:5000/api
```

---

## Switching Between Mock and Backend

### Current: Using Mock Services
Frontend uses mock auth and database (localStorage)

### To Use Backend:
1. Update imports in `src/App.tsx`:
```typescript
// Change from mockAuthService to backendAPIService
import { BackendAPIService } from './services/backendAPIService';
```

2. Update Login.tsx:
```typescript
// Use backend API instead of mock
await BackendAPIService.login(email, password);
```

3. Run both frontend and backend:
```bash
npm run dev:all
```

---

## Hackathon Tips

**For Demo:**
- Use mock mode (current) - no backend setup needed
- All features work without external dependencies

**For Final Submission:**
- Switch to backend for persistent cloud data
- Deploy backend to Heroku/Railway for free
- Deploy frontend to Vercel/Netlify

---

## Next Steps

1. **Database Upgrade** - Replace in-memory with MongoDB/PostgreSQL
2. **Authentication** - Add JWT tokens for security
3. **Deployment** - Deploy backend to cloud (Heroku, Railway, etc.)
4. **Security** - Add rate limiting, input validation
5. **Logging** - Add proper logging system

---

**Backend is ready for hackathon!** 🚀
