# Using Mock Gemini vs Real API

## Current Setup: MOCK MODE ✅

The app is currently using a **mock Gemini service** that returns realistic fake legal analyses:
- ✅ No API key required
- ✅ Works completely offline
- ✅ Perfect for hackathon demos
- ✅ Instant responses (no API delays)

**File using mock:**
- `src/services/mockGeminiService.ts` - Returns pre-generated legal analyses

---

## How to Use Mock Mode (Current)

1. **Just run the app - no setup needed!**
   ```bash
   npm run dev
   ```

2. **Try these example scenarios:**
   - "Recovery of debt from a company that has defaulted on payment"
   - "Succession of property after death without a will (intestate)"
   - "Consumer complaint against an e-commerce giant for faulty goods"
   - Type anything else for a generic legal response

3. **What you get:**
   - ✅ Realistic legal analysis (summaries, applicable laws, procedures)
   - ✅ Proper citations and sources
   - ✅ Professional UI appearance

---

## Mock vs Real API

| Feature | Mock Mode | Real Gemini API |
|---------|-----------|-----------------|
| Setup Time | 0 minutes | 5 minutes |
| Internet Required | No | Yes |
| API Key Needed | No | Yes |
| Response Time | 1.5 seconds | 2-5 seconds |
| Data Accuracy | Pre-generated | AI-generated (real-time) |
| Customization | Limited to 3 examples | Unlimited |
| Perfect for | Demos | Production |

---

## Switching to Real Gemini API (When Ready)

### Step 1: Get Gemini API Key
1. Go to **https://aistudio.google.com/**
2. Click **"Get API Key"**
3. Create a Google Cloud project
4. Copy your API key

### Step 2: Add to `.env` File
```
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

### Step 3: Update App.tsx Import
Change **Line 2** in `src/App.tsx`:

```typescript
// CURRENT (Mock Mode):
import { GeminiService } from './services/mockGeminiService';

// CHANGE TO (Real Gemini API):
import { GeminiService } from './services/geminiService';
```

### Step 4: Restart Dev Server
```bash
npm run dev
```

Done! Now using real Gemini API ✅

---

## File Reference

**Mock Service:**
```
src/services/mockGeminiService.ts
- Returns pre-generated laws and procedures
- No API calls made
- Works offline
```

**Real Service:**
```
src/services/geminiService.ts
- Calls Google Gemini API
- Real-time AI analysis
- Requires valid API key + internet
```

---

## Pro Tip for Hackathon 🎯

**Use Mock Mode for your demo:**
- No delays waiting for API responses
- No API key management issues
- Consistent, reliable responses
- Judges see polished product

**Example Demo Flow:**
1. Login with any email/password
2. Type a legal scenario
3. See instant professional analysis
4. Show case history and features
5. Judges impressed! ✅

---

## Testing Different Scenarios

The mock service recognizes these keywords:
- **debt** - Shows recovery of debt analysis
- **succession** / **will** - Shows inheritance analysis  
- **consumer** / **ecommerce** - Shows consumer complaint analysis
- **Anything else** - Shows generic legal response

---

## Troubleshooting

**"Analysis failed" error?**
- You might be using real API without valid key
- Check: Are you importing from `mockGeminiService`?
- If using real API: Check `.env` file has valid `VITE_GEMINI_API_KEY`

**"My custom scenario returns generic response?"**
- That's expected! The mock service has 3 detailed examples
- Other scenarios return generic but professional legal guidance
- Get full customization by switching to real Gemini API

**"Why is analysis taking 1.5 seconds?"**
- Mock mode simulates API latency for realism
- Real API may take 2-5 seconds depending on network
- Both are fast enough for user experience

---

## Summary

- **Right now:** You're in perfect demo mode! 🎉
- **No setup:** Just run `npm run dev`
- **Full features:** Authentication, database, analysis all work
- **Later:** Switch to real API for production

You're ready to present to judges! 🚀
