# Testing & Verification Guide

## ✅ How to Test Indian Legal Sources Integration

### Prerequisites
```bash
# Make sure you have API key set
# If using mock service: No API key needed
# If using real Gemini: VITE_GEMINI_API_KEY must be in .env

npm run dev
```

---

## Test Case 1: Criminal Case (Cheque Bouncing)

### Run This Scenario
```
Scenario Input: 
"I lent my friend ₹50,000 through a check for business. 
The check bounced. What can I do legally?"
```

### Expected Sources in Response
✅ **Bare Acts Links:**
- Negotiable Instruments Act Section 138
- IPC Section 420
- CrPC Section 200

✅ **Indian Kanoon Links:**
- Cheque bouncing precedent search
- Relevant court cases

✅ **Gazette Links:**
- Latest amendments to NIA

✅ **E-Courts Links:**
- FIR filing procedures
- Court proceedings information

---

## Test Case 2: Property Dispute (Inheritance)

### Run This Scenario
```
Scenario Input:
"My father passed away leaving property. 
His will says it's mine. But my brother claims equal share. 
What's the law?"
```

### Expected Sources in Response
✅ **Bare Acts Links:**
- Hindu Succession Act 1956
- Indian Succession Act 1925
- CPC Section 22

✅ **Indian Kanoon Links:**
- Property inheritance cases
- Will validity precedents
- Sibling succession cases

✅ **E-Courts Links:**
- Civil suit procedures
- Timeline information
- Appeal procedures

---

## Test Case 3: New BNS Law (Criminal)

### Run This Scenario
```
Scenario Input:
"I was arrested for theft. Kept in custody for 3 days. 
The police say it's under new BNS. Is this legal?"
```

### Expected Sources in Response
✅ **NEW LAW (BNS 2023):**
- Bare Acts link to BNS statute
- Gazette notification of BNS
- Recent BNS cases on Indian Kanoon
- BNSS 2023 procedures

✅ **OLD LAW (IPC - For Reference):**
- Bare Acts link to old IPC
- Note about law transition

✅ **Comparison:**
- Clear statement that BNS replaced IPC
- Link to both for reference

---

## Test Case 4: Contract Dispute (Commercial)

### Run This Scenario
```
Scenario Input:
"My company ordered goods worth ₹2 lakhs from a supplier. 
They didn't deliver. Now my client is suing me. 
What legal remedies do I have against the supplier?"
```

### Expected Sources in Response
✅ **Bare Acts Links:**
- Indian Contract Act 1872 (Sections 73, 74)
- Sale of Goods Act 1930
- Specific Relief Act 1963

✅ **Indian Kanoon Links:**
- Commercial contract cases
- Supplier liability cases
- Damages calculation cases

✅ **E-Courts Links:**
- Civil suit procedures
- Damages remedy processes
- Enforcement procedures

---

## Verification Checklist

After getting results, verify:

### 1. Source Links Work
- [ ] Click on each Bare Acts link
  - Should open: bareactsilc.indiacode.nic.in
  - Should show: Exact statute section
  - Should be: Official Ministry of Law & Justice site

- [ ] Click on each Kanoon link
  - Should open: indiankanoon.org
  - Should show: search results for that statute
  - Should have: Real court cases

- [ ] Click on Gazette links
  - Should open: egazette.gov.in
  - Should show: Official government notification
  - Should have: Amendment or law proclamation

- [ ] Click on E-Courts links
  - Should open: ecourts.gov.in
  - Should show: Procedural guidelines
  - Should be: Official court service portal

### 2. Links Are Specific
- [ ] Links are NOT generic (not just "indiankanoon.org/")
- [ ] Each law has its own specific link
- [ ] URLs include section numbers when applicable
- [ ] Search queries are relevant to scenario

### 3. Sources Match Analysis
- [ ] Laws mentioned in analysis have corresponding links
- [ ] Procedure steps link to E-Courts procedures
- [ ] New laws link to Gazette notifications
- [ ] Old laws show comparison to new laws

### 4. Law Transition Handling
- [ ] If scenario mentions criminal law, shows BNS (new) + IPC (old)
- [ ] If mentions procedures, shows BNSS (new) + CrPC (old)
- [ ] If mentions evidence, shows BSA (new) + IEA (old)
- [ ] Clear labeling of which is new/old

### 5. No Broken Links
- [ ] All generated URLs are valid format
- [ ] No malformed URLs
- [ ] No encoding issues
- [ ] URLs open successfully in browser

---

## Expected Response Structure

When you get a response, it should look like:

```
ANALYSIS RESULT

Summary:
[AI-generated legal analysis paragraph]

Applicable Laws:
1. [Act Name] Section [number]
   Explanation: [how it applies]
   
   Source Links:
   - Statute: https://bareactsilc.indiacode.nic.in/[act]/section/[no]
   - Cases: https://indiankanoon.org/search/?formInput=[act]+[section]
   - Amendments: https://egazette.gov.in/[notification]

2. [Act Name] Section [number]
   [Same structure as above]

Procedural Steps:
1. [Step 1] → Link to E-Courts procedure
2. [Step 2] → Link to E-Courts procedure
3. [Step 3] → Link to E-Courts procedure

Sources Provided:
✓ Indian Kanoon - Case precedents
✓ Digital Bare Acts - Statute texts
✓ Gazette of India - Amendments
✓ E-Courts Services - Procedures
✓ [10+ specific custom links]
```

---

## Debugging If Something Seems Wrong

### Problem: Links look generic
**Expected:** https://bareactsilc.indiacode.nic.in/negotiable-instruments-act/section/138
**Wrong:** https://bareactsilc.indiacode.nic.in/

**Solution:** Check geminiService.ts buildSources() method

---

### Problem: Statute links don't work
**Possible Cause 1:** Act name not in the actMap
**Solution:** Add it to generateBareActUrl() method

**Possible Cause 2:** Bare Acts URL structure changed
**Solution:** Test bareactsilc.indiacode.nic.in directly

---

### Problem: No Gazette links for new laws
**Check:** If scenario mentions BNS/BNSS/BSA
**Verify:** generateGazetteUrl() method includes those laws

---

### Problem: E-Courts links are generic
**Should be:** Specific to case type (FIR, trial, appeal, etc.)
**Check:** extractCaseType() correctly identifies case type

---

## Testing Commands

### Test with Mock Service (No API Key)
```bash
npm run dev

# Edit src/App.tsx line 2:
import { GeminiService } from './services/mockGeminiService';

# Mock service returns hardcoded responses with basic links
# Good for testing UI rendering and link display
```

### Test with Real Gemini API
```bash
# Set API key in .env:
VITE_GEMINI_API_KEY=AIza_your_real_key

# Edit src/App.tsx line 2:
import { GeminiService } from './services/geminiService';

npm run dev

# Hit a scenario and check Console
# Look for network requests and response structure
```

### Manual Testing in Browser Console
```javascript
// In browser console (after app loads)
const service = new GeminiService();

service.analyzeScenario("Cheque bounced, what to do?")
  .then(result => {
    console.log("Full Result:", result);
    console.log("Laws:", result.applicableLaws);
    console.log("Sources:", result.sources);
    
    // Check each source
    result.sources.forEach(source => {
      console.log(`${source.title} → ${source.uri}`);
    });
  })
  .catch(err => console.error("Error:", err));
```

---

## What to Look For

### ✅ Good Integration Signs
- [ ] Multiple sources per law
- [ ] Mix of Bare Acts + Kanoon + Gazette + E-Courts
- [ ] Sources are specific to the scenario
- [ ] Links contain section numbers, act names
- [ ] New laws show Gazette notifications
- [ ] Old laws show for comparison
- [ ] Procedure steps link to E-Courts

### ❌ Bad Integration Signs
- [ ] Only 1 generic link for all laws
- [ ] All links go to same database
- [ ] Links don't match scenario
- [ ] Generic "indiankanoon.org" URLs
- [ ] No Gazette links for new laws
- [ ] Broken URLs or 404s
- [ ] Duplicate links

---

## Performance Check

### Expected Response Time
- **Mock Service:** < 1 second
- **Real Gemini API:** 3-6 seconds (depends on API latency)

### Expected Source Count
- **Minimum:** 6-8 sources per analysis
- **Typical:** 10-15 sources
- **Maximum:** 20+ if many applicable laws

### Link Quality
- **Valid URLs:** 100% (should be no broken links)
- **Relevant Links:** 95%+ match the scenario
- **Specific Links:** Each law has custom URL, not generic

---

## Sample Test Results

### Input
```
"Took a loan from friend. Should repay, but need legal docs. 
Where do I get loan agreement format?"
```

### Expected Output
```
Applicable Laws:
1. Indian Contract Act 1872 Section 10
   (Valid contract offering)
   
   Sources:
   - https://bareactsilc.indiacode.nic.in/indian-contract-act-1872/section/10
   - https://indiankanoon.org/search/?formInput=Indian+Contract+Act+10
   - https://egazette.gov.in/ (amendments)

2. Indian Contract Act 1872 Section 14
   (Contract acceptance)
   
   Sources:
   - https://bareactsilc.indiacode.nic.in/indian-contract-act-1872/section/14
   - https://indiankanoon.org/search/?formInput=Indian+Contract+Act+14

Procedures:
1. Draft loan agreement with terms
   Link: e-courts.gov.in [format link]
2. Get both parties to sign
3. Register if required
4. Keep safe for enforcement

Available Sources:
✓ Full statute text (Bare Acts)
✓ Court precedents (Indian Kanoon)
✓ Latest amendments (Gazette)
✓ Legal procedures (E-Courts)
```

---

## Final Verification

When you're confident integration is working:

### Make This Test Call
```
Scenario: "Property dispute between siblings after father's death"
```

### You Should Get:
✅ Hindu Succession Act links  
✅ Indian Succession Act links  
✅ CPC links  
✅ Multiple Indian Kanoon precedent searches  
✅ Civil court procedures  
✅ All with specific section numbers  

### If Something's Wrong:
- Check console for errors
- Verify API key is set (if using real)
- Check mock service is accessible (if using mock)
- Look at geminiService.ts for any syntax errors

---

## Success Criteria

Your integration is successful when:

✅ Every analysis has 10+ sources  
✅ Sources include Bare Acts URLs  
✅ Sources include Kanoon search URLs  
✅ Sources include Gazette links (for new laws)  
✅ Sources include E-Courts links (for procedures)  
✅ All links are clickable and valid  
✅ Links match the legal analysis  
✅ New laws show Gazette notifications  
✅ Old laws show comparison info  
✅ No broken links or 404s  

**When all these are true, your Indian Legal Sources Integration is complete!** 🎉
