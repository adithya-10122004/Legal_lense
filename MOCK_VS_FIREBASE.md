# Using Mock Services vs Real Firebase

## Current Setup: MOCK MODE ✅

The app is currently configured to use **mock services** that store data in browser localStorage:
- ✅ No Firebase required
- ✅ Perfect for hackathon demos
- ✅ Works completely offline
- ✅ Data persists in browser (survives page refresh)

**Files using mock services:**
- `src/services/mockAuthService.ts` - Local authentication
- `src/services/mockFirestoreService.ts` - Local database (localStorage)

---

## How to Use Mock Mode (Current)

1. **No setup needed!** Just run:
   ```bash
   npm run dev
   ```

2. **Demo users:**
   - Register any email/password (no validation)
   - Example: `test@example.com` / `password123`
   - Create cases - they'll be saved to browser storage

3. **Data persistence:**
   - All cases are saved in `localStorage`
   - Data survives browser refresh
   - Each browser/device has separate data

---

## Switching to Real Firebase (When Ready)

### Step 1: Set up Firebase
1. Go to https://console.firebase.google.com/
2. Create project → Enable Email/Password auth → Create Firestore Database
3. Copy credentials to `.env` file

### Step 2: Update App.tsx imports
Change these 2 lines in `src/App.tsx`:

```typescript
// CURRENT (Mock Mode):
import { FirebaseAuthService } from './services/mockAuthService';
import { FirestoreService } from './services/mockFirestoreService';

// CHANGE TO (Real Firebase):
import { FirebaseAuthService } from './services/firebaseAuthService';
import { FirestoreService } from './services/firestoreService';
```

### Step 3: Restart dev server
```bash
npm run dev
```

That's it! Now using real Firebase. ✅

---

## Comparison

| Feature | Mock Mode | Real Firebase |
|---------|-----------|-----------------|
| Setup Time | 0 minutes | 5 minutes |
| Internet Required | No | Yes |
| Data Cloud Backup | No | Yes |
| Multi-device Sync | No | Yes |
| Free Tier | Unlimited | Generous |
| Perfect for | Demos/Hacks | Production |

---

## Important Notes

### Mock Mode Limitations:
- Data only in one browser (not synced across devices)
- If user clears browser data, all cases are lost
- Can't access from mobile/other devices
- But perfect for showing judges! 🎯

### Real Firebase Benefits:
- Data synced across all devices
- Secure cloud backup
- Professional authentication
- Can deploy to production

---

## Pro Tip for Hackathon 🎯

**Use Mock Mode while developing/demoing to judges:**
- No setup delays
- Offline capability
- Instant data persistence
- Perfect demo experience

**Switch to Real Firebase after winning:**
- Cloud data backup
- Multi-device sync
- Production ready

---

## Troubleshooting

**"Why is my data gone?"**
- You're in mock mode and cleared browser data
- Data is stored in localStorage - clearing it deletes everything
- Use DevTools → Application → Local Storage to check

**"Can't access my cases on phone?"**
- Mock mode stores data locally per browser
- Each device has its own storage
- Switch to Real Firebase for cloud sync

**"Did I lose all my data?"**
- In mock mode, data is in browser localStorage
- To export: Open DevTools → Application → Local Storage → Copy `legallense_firestore_cases`
- To backup: Use browser's download feature for localStorage data

---

Ready to switch? Update those 2 import lines in `App.tsx` and you're good to go! 🚀
