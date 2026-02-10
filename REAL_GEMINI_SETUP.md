# Using the Real Gemini API Service

Your project now includes **two versions** of the Gemini service:

## 📁 Files

1. **`src/services/mockGeminiService.ts`** - Hardcoded responses (no API key needed)
2. **`src/services/geminiService.ts`** - Real Google Gemini API (requires API key)

---

## 🔧 Setup: Get and Configure Your API Key

### Step 1: Create a Google Cloud Project
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikeys)
2. Click **"Get API key"** → Create new API key
3. Copy the key (looks like: `AIza...`)

### Step 2: Add to `.env` File
```env
VITE_GEMINI_API_KEY=AIza_YOUR_KEY_HERE
```

### Step 3: Restart Dev Server
```bash
npm run dev
```

---

## 🔄 Switching Between Mock and Real

### In `src/App.tsx`, change line 2:

**Current (Mock Service):**
```typescript
import { GeminiService } from './services/mockGeminiService';
```

**To use Real API:**
```typescript
import { GeminiService } from './services/geminiService';
```

Then restart: `npm run dev`

---

## ✅ Real Service Features

The corrected `geminiService.ts` includes:

✅ **Official SDK** - Uses `@google/generative-ai` (Google's official package)
✅ **Latest Model** - Uses `gemini-2.0-flash` (latest fastest model)
✅ **Structured Output** - JSON schema validation for consistent responses
✅ **Better Prompting** - System instructions for Indian legal focus
✅ **Error Handling** - Proper error messages with suggestions
✅ **Type Safety** - Full TypeScript interfaces
✅ **Source Extraction** - Automatically pulls URLs from responses

---

## 📊 Mock vs Real Comparison

| Feature | Mock Service | Real Service |
|---------|--------------|--------------|
| **Requires API Key** | ❌ No | ✅ Yes |
| **Internet Connection** | ❌ No | ✅ Yes |
| **Response Time** | ⚡ Instant | ~3-5 seconds |
| **Offline Mode** | ✅ Yes | ❌ No |
| **Demo/Hackathon** | ✅ Perfect | ❌ Risky (API quota limit) |
| **Production** | ❌ Not good | ✅ Professional |
| **Accuracy** | Hardcoded (okay) | AI-generated (better) |
| **Updates** | Manual code changes | Real-time AI analysis |

---

## 🎯 When to Use Each

### Use **Mock Service** 🎭
- ✅ During hackathon demo (no internet risk)
- ✅ Testing without API key
- ✅ Offline presentations
- ✅ Developing features
- ✅ Learning/practicing

### Use **Real Service** 🔴
- ✅ Production deployment
- ✅ Final project submission
- ✅ When you have stable internet
- ✅ When you need actual AI analysis

---

## 🚨 Important: API Quotas

**Free Tier Limits:**
- 15 requests per minute
- 1 million tokens per day
- Watch for rate limiting errors

**For Hackathon:** Use mock service to avoid hitting quotas!

---

## 🔧 Troubleshooting

### Error: "Gemini API key not found"
```
✅ Solution:
1. Add VITE_GEMINI_API_KEY=your_key to .env
2. Run: npm run dev
```

### Error: "API request failed" or "Rate limit exceeded"
```
✅ Solution:
1. Wait a few minutes
2. Or switch to Mock service temporarily
3. Check your API quota at Google AI Studio
```

### Error: "Invalid response format"
```
✅ Solution:
1. Your API key is invalid
2. Or quotas are exceeded
3. Try the mock service
```

---

## 📝 Code Example: Using Real Service in Components

```typescript
// In your component or service
import { GeminiService } from './services/geminiService';

// Initialize with API key (auto-reads from .env)
const geminiService = new GeminiService();

// Or pass key manually
const geminiService = new GeminiService('AIza_YOUR_KEY');

// Use it
const result = await geminiService.analyzeScenario(
  "Two siblings fighting over inherited property"
);

console.log(result.applicableLaws); // Array of laws
console.log(result.proceduralSteps); // Array of steps
console.log(result.sources); // Array of source links
```

---

## 📊 Complete Setup Checklist

- [ ] Have Google Gemini API key from [aistudio.google.com](https://aistudio.google.com/app/apikeys)
- [ ] Added `VITE_GEMINI_API_KEY=...` to `.env` file
- [ ] Ran `npm install @google/generative-ai` (already done)
- [ ] Updated import in `src/App.tsx` to use real service
- [ ] Restarted dev server with `npm run dev`
- [ ] Tested with a legal scenario
- [ ] Verified responses look good
- [ ] Switched back to mock if needed

---

## 🎓 Learning: How the Corrected Service Works

### Structure
```
GeminiService
├── Constructor: Reads API key from .env
├── Client: GoogleGenerativeAI instance
├── Model: "gemini-2.0-flash"
└── Method: analyzeScenario()
    ├── Creates model instance with system prompt
    ├── Defines JSON response schema
    ├── Sends request to Gemini
    ├── Parses structured response
    ├── Extracts URLs for sources
    └── Returns LegalAnalysis object
```

### Key Improvements from Original
1. **Official SDK** - No manual HTTP calls
2. **Type Safety** - Full TypeScript interfaces
3. **Error Handling** - Clear error messages
4. **Structured Output** - Guaranteed JSON format
5. **Latest Model** - `gemini-2.0-flash` instead of `gemini-pro`

---

## ✨ Next Steps

1. **Get API Key** - Visit [aistudio.google.com](https://aistudio.google.com/app/apikeys)
2. **Add to .env** - `VITE_GEMINI_API_KEY=your_key_here`
3. **Update App.tsx** - Import from `geminiService` instead of `mockGeminiService`
4. **Test it** - Run and try analyzing a scenario
5. **Revert if needed** - Switch back to mock anytime

**Your app is ready for both mock and real APIs!** 🚀
