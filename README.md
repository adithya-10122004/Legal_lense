# Legal_Lense - AI-Powered Legal Analysis Platform

## 📋 Overview

Legal_Lense is a full-stack application that provides AI-powered legal analysis for Indian legal scenarios. Built with React + TypeScript frontend and Node.js/Express backend, it's ready for production deployment or hackathon demos.

**Status:** ✅ Fully functional with mock services (no API keys needed!)

---

## 🚀 Quick Start

### Option 1: Frontend Only (Recommended for Demo)
```bash
npm run dev
```
- Opens at `http://localhost:5173`
- Uses mock authentication & database
- No backend needed
- Perfect for hackathon presentation

### Option 2: Frontend + Backend Together
```bash
npm run dev:all
```
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`
- Both running simultaneously
- Shows full-stack capabilities

### Option 3: Backend Only
```bash
npm run dev:backend
```
- Backend API at `http://localhost:5000`
- Test API endpoints with curl

---

## 📦 What's Included

### Frontend
- ✅ React 18 with TypeScript
- ✅ Tailwind CSS for styling
- ✅ Login/Register system
- ✅ Case history management
- ✅ Voice input support
- ✅ Responsive design

### Backend
- ✅ Express.js REST API
- ✅ User authentication
- ✅ Case management (CRUD)
- ✅ In-memory database
- ✅ CORS enabled

### Features
- ✅ Secure user authentication
- ✅ Persistent case history
- ✅ AI-powered legal analysis
- ✅ Professional UI/UX
- ✅ Mobile responsive
- ✅ Works offline (mock mode)

---

## 🎯 Running for Hackathon

### Judges First Impression
```bash
npm run dev
```
- Clean, professional UI appears
- Click "Register" → any email/password
- Enter a legal scenario: "Property dispute between siblings"
- See instant legal analysis with laws & procedures
- Show case history
- Perfect demo! ✅

### If You Want to Impress Further
```bash
npm run dev:all
```
- Shows you have backend infrastructure
- Demonstrates full-stack knowledge
- Data flows through real API calls
- Production-ready architecture

---

## 📚 Documentation

### Getting Started
- **[BACKEND_QUICK_START.md](BACKEND_QUICK_START.md)** - Run backend instructions
- **[BACKEND_API.md](BACKEND_API.md)** - Complete API reference

### Architecture Guides
- **[MOCK_VS_FIREBASE.md](MOCK_VS_FIREBASE.md)** - Switch between mock and Firebase auth
- **[MOCK_VS_GEMINI_API.md](MOCK_VS_GEMINI_API.md)** - Switch between mock and real AI
- **[FIREBASE_SETUP.md](FIREBASE_SETUP.md)** - Firebase configuration

---

## 🗂️ Project Structure

```
legal__lense/
├── src/
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   ├── LegalCard.tsx
│   │   └── Login.tsx
│   ├── services/
│   │   ├── mockGeminiService.ts    (AI analysis)
│   │   ├── mockAuthService.ts      (Authentication)
│   │   ├── mockFirestoreService.ts (Database)
│   │   ├── backendAPIService.ts    (Backend API)
│   │   └── ... other services
│   ├── types.ts                    (TypeScript types)
│   ├── App.tsx                     (Main component)
│   ├── main.tsx                    (Entry point)
│   └── index.css                   (Tailwind styles)
├── server.ts                       (Express backend)
├── package.json                    (Dependencies)
├── tsconfig.json                   (TypeScript config)
└── vite.config.ts                 (Vite config)
```

---

## 🔧 Technology Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Vite
- lucide-react (icons)

### Backend
- Node.js
- Express.js
- TypeScript
- CORS enabled

### Optional Integration
- Firebase (cloud auth & database)
- Google Gemini API (real AI analysis)

---

## 🎮 Features Demo

### 1. Authentication
- Register with any email/password
- Login/logout functionality
- Persistent user sessions

### 2. Case Analysis
- Enter legal scenario
- Get instant legal analysis
- View applicable laws and procedures
- See relevant sources and citations

### 3. Case Management
- View case history
- Delete individual cases
- Clear all history
- Cases persist across sessions

### 4. Voice Input
- Speak your legal scenario
- Click microphone icon
- Auto-populated text field

### 5. Professional UI
- Modern gradient design
- Responsive layout
- Smooth animations
- Dark/light contrast

---

## 🔐 Security Notes

### Current (Mock Mode)
- Credentials stored in localStorage (demo only)
- No passwords encrypted
- Not for production use

### Production Ready
- For real deployment, switch to:
  - Firebase Authentication (secure)
  - PostgreSQL/MongoDB (persistent)
  - JWT tokens (stateless auth)

---

## 📈 Scaling to Production

### Step 1: Add Persistent Database
```bash
npm install mongodb mongoose
```
Replace in-memory Map with MongoDB

### Step 2: Add JWT Authentication
```bash
npm install jsonwebtoken
```
Replace simple password storage

### Step 3: Deploy Backend
```bash
# Railway (recommended)
npm install -g railway
railway up

# Or Heroku
heroku create
git push heroku main
```

### Step 4: Deploy Frontend
```bash
npm run build
# Deploy dist/ to Vercel/Netlify
```

---

## 🎓 Learning Resources

### For Judges/Learning
- **Architecture:** Full-stack React + Node.js
- **State Management:** React hooks
- **Styling:** Tailwind CSS utilities
- **Type Safety:** TypeScript throughout
- **API Design:** RESTful principles

### Key Files to Review
1. `src/App.tsx` - Main logic & state management
2. `server.ts` - Backend API design
3. `src/services/` - Service abstraction layer
4. `src/Login.tsx` - Authentication UI

---

## 🐛 Common Issues

### "Can't run dev:all"
- Install concurrently: `npm install concurrently`
- Then: `npm run dev:all`

### "Backend not responding"
- Run in separate terminal: `npm run dev:backend`
- Check: `http://localhost:5000/api/health`

### "Frontend can't find backend"
- Check `.env`: `VITE_API_URL=http://localhost:5000/api`
- Restart frontend after env changes

### "Data disappeared!"
- In mock mode: Data in localStorage
- Clearing browser data deletes it
- Use backend for persistent storage

---

## 💡 Next Steps

1. **Run the app:** `npm run dev`
2. **Register:** Any email/password
3. **Try demos:** "Recovery of debt", "Succession", "Consumer complaint"
4. **Explore code:** Review `src/App.tsx` and `server.ts`
5. **Deploy:** When ready, follow scaling guide above

---

## 📱 Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design

---

## 📧 API Endpoints Summary

```
Authentication:
POST   /api/auth/register
POST   /api/auth/login

Cases:
GET    /api/cases/:userId
POST   /api/cases
DELETE /api/cases/:caseId
DELETE /api/cases/user/:userId

Health:
GET    /api/health
```

See [BACKEND_API.md](BACKEND_API.md) for full documentation.

---

## 🏆 Hackathon Winning Tips

1. **Demo with mock mode** - Fast, reliable, impressive
2. **Show the architecture** - Full-stack capability
3. **Explain the tech stack** - TypeScript, Vite, React
4. **Show code organization** - Services separation
5. **Mention scalability** - Database, deployment options
6. **Talk about features** - Auth, voice, history, analysis

---

## 📄 License & Credits

Built for legal professionals and students to understand Indian legal procedures through AI-powered analysis.

---

## 🚀 Ready?

```bash
npm run dev
```

Enjoy! 🎉
