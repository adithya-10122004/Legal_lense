# Firebase Setup Guide for Legal_Lense

## Quick Setup (5 minutes)

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"**
3. Enter name: `legal-lense-demo` (or any name)
4. Disable Google Analytics (not needed for this project)
5. Click **"Create project"** and wait for setup to complete

### Step 2: Enable Authentication

1. In Firebase Console, click **"Authentication"** (left sidebar)
2. Click **"Get started"**
3. Select **"Email/Password"**
4. Toggle **"Enable"** and save

### Step 3: Enable Firestore Database

1. Click **"Firestore Database"** (left sidebar)
2. Click **"Create database"**
3. Select **"Start in test mode"** (for development)
4. Choose location: `us-central1` (or nearest to you)
5. Click **"Create"**

### Step 4: Get Firebase Configuration

1. Click **"Project Settings"** (gear icon, top-left)
2. Scroll to **"Your apps"** section
3. Look for code snippet with `<script>` tag
4. You'll see a config object like:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "legal-lense-demo.firebaseapp.com",
  projectId: "legal-lense-demo",
  storageBucket: "legal-lense-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};
```

### Step 5: Add to .env File

Copy the config values to `.env` file in your project root:

```
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=legal-lense-demo.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=legal-lense-demo
VITE_FIREBASE_STORAGE_BUCKET=legal-lense-demo.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123def456
```

### Step 6: Restart Dev Server

```bash
npm run dev
```

Done! ✅ Your app now uses Firebase for authentication and database!

---

## Firebase Structure

### Collections

**`cases`** - Stores all legal analyses
```
{
  userId: string          // User ID from Firebase Auth
  id: string             // Unique case ID
  scenario: string       // Legal scenario description
  summary: string        // AI analysis summary
  applicableLaws: [...]  // Array of laws
  proceduralSteps: [...]  // Array of steps
  sources: [...]         // Array of citations
  timestamp: number      // When case was created
  createdAt: Timestamp   // Server timestamp
}
```

---

## Features Enabled by Firebase

✅ **Secure Authentication** - Email/Password login with encrypted passwords  
✅ **Cloud Database** - Cases stored securely in Firestore  
✅ **Real-time Sync** - Data syncs across all user's devices  
✅ **User Isolation** - Each user only sees their own cases  
✅ **Free Tier** - Google gives $300 free credits + generous free tier limits  

---

## Firestore Rules (Security)

The default test mode allows anyone to read/write. For production, update Firestore rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /cases/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
    }
  }
}
```

---

## Troubleshooting

### "API Key Error" or "Invalid Configuration"
- Check `.env` file values match Firebase Console exactly
- Restart dev server: `npm run dev`
- Clear browser cache (Ctrl+Shift+Delete)

### "Authentication Failed"
- Ensure Email/Password auth is enabled in Firebase Console
- Email/password must be at least 6 characters for registration

### "Can't save cases"
- Verify Firestore database is created and in "test mode"
- Check browser console for permission errors
- Make sure you're logged in as authenticated user

### Cases not showing after login
- Wait a few seconds for Firestore to sync
- Check browser console for errors
- Verify user has write permission in Firestore rules

---

## Next Steps

- Deploy to Firebase Hosting: `firebase deploy`
- Add Google Sign-In for easier authentication
- Set up Firestore backup rules for production
- Monitor Firestore usage in Firebase Console

Enjoy! 🚀
