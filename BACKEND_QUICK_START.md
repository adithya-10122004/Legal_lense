# Quick Start Guide - Backend Setup

## 🚀 Run Backend Only

```bash
npm run dev:backend
```

This starts the Express server on `http://localhost:5000`

**What it does:**
- ✅ Runs on port 5000
- ✅ In-memory database (data stored in RAM during session)
- ✅ Full REST API ready
- ✅ CORS enabled for frontend

---

## 🎯 Run Frontend + Backend Together

```bash
npm run dev:all
```

This runs:
- **Frontend:** Vite dev server (http://localhost:5173 or next available)
- **Backend:** Express server (http://localhost:5000)

Both run simultaneously in the same terminal!

---

## 📡 Testing the Backend

### Health Check
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "Backend is running",
  "timestamp": "2026-02-10T...",
  "userCount": 0,
  "caseCount": 0
}
```

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

---

## 🗂️ Backend File Structure

```
project/
├── server.ts                 # Express server + routes
├── src/
│   ├── services/
│   │   ├── backendAPIService.ts    # Frontend → Backend communication
│   │   ├── mockAuthService.ts      # Mock auth (currently used)
│   │   ├── mockFirestoreService.ts # Mock database (currently used)
│   │   └── ...
│   ├── App.tsx              # Main frontend component
│   └── ...
├── package.json             # Scripts for dev:backend, dev:all
├── .env                     # VITE_API_URL=http://localhost:5000/api
└── BACKEND_API.md          # Full API documentation
```

---

## ⚙️ Current Architecture

### Option 1: Mock Mode (Current Default)
- Frontend uses: `mockAuthService` + `mockFirestoreService`
- Data stored in: Browser localStorage
- Backend: Not running
- Perfect for: Hackathon demos, no setup

### Option 2: Backend Mode (With Real Backend)
- Frontend uses: `backendAPIService`
- Backend: Express server (in-memory database)
- Data stored in: Server RAM (cleared on restart)
- Perfect for: Integration testing

---

## 🔄 Switching to Backend Mode

### Step 1: Update Frontend Imports

Edit `src/App.tsx`:
```typescript
// CURRENT (Mock mode):
// import { FirebaseAuthService } from './services/mockAuthService';
// import { FirestoreService } from './services/mockFirestoreService';

// CHANGE TO (Backend mode):
import { BackendAPIService } from './services/backendAPIService';
import { FirebaseAuthService } from './services/backendAPIService';
import { FirestoreService } from './services/backendAPIService';
```

### Step 2: Update Login.tsx

Already uses `FirebaseAuthService` from imports, so no additional changes needed if you import the backend service.

### Step 3: Run Both Services

```bash
npm run dev:all
```

---

## 📊 Database Persistence Options

### Current: In-Memory
- ✅ No setup required
- ❌ Data lost on server restart
- ✅ Perfect for demo
- Uses: JavaScript `Map` object

### Next Steps: Persistent Databases

**Option 1: SQLite (Simple)**
```bash
npm install sqlite express
```

**Option 2: MongoDB (Document-based)**
```bash
npm install mongoose
```

**Option 3: PostgreSQL (Enterprise)**
```bash
npm install pg sequelize
```

---

## 🎯 For Hackathon

**Best Strategy:**
1. **Right now:** Use mock mode (no backend needed)
2. **For demo:** Run backend alongside for realistic data flow
3. **For deployment:** Replace backend with persistent database

**Run command for judges:**
```bash
npm run dev:all
```
Shows you have full stack capability! 🎉

---

## 📝 API Response Examples

### Create Case (Backend)
```bash
curl -X POST http://localhost:5000/api/cases \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "scenario": "Property dispute",
    "summary": "...",
    "applicableLaws": [...],
    "proceduralSteps": [...],
    "sources": [...]
  }'
```

Response:
```json
{
  "message": "Case created successfully",
  "case": {
    "id": "case456",
    "userId": "user123",
    "scenario": "Property dispute",
    ...
  }
}
```

---

## 🐛 Troubleshooting

**"Backend not running?"**
- Run: `npm run dev:backend`
- Check: http://localhost:5000/api/health

**"Frontend can't reach backend?"**
- Check `.env`: `VITE_API_URL=http://localhost:5000/api`
- Restart frontend after .env changes

**"Data lost after restart?"**
- Expected! In-memory database clears on restart
- To fix: Use SQLite/MongoDB/PostgreSQL

**"How do I see what's in the backend database?"**
- No UI yet. We can add an admin dashboard later
- Or use: curl commands to test API

---

## 🚀 Deployment Options

When ready to deploy:

**Frontend:**
- Vercel
- Netlify
- GitHub Pages

**Backend:**
- Railway (recommended, free tier)
- Heroku
- Render
- AWS

---

## 📚 Full Documentation

- See [BACKEND_API.md](BACKEND_API.md) for complete API reference
- See [MOCK_VS_FIREBASE.md](MOCK_VS_FIREBASE.md) for mock vs real services
- See [MOCK_VS_GEMINI_API.md](MOCK_VS_GEMINI_API.md) for mock vs real API

---

**You now have a complete full-stack setup!** 🎉

Ready to run?
```bash
npm run dev:all
```
