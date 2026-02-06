# 🎯 RESUME AI HELPER - QUICK START

## ⚡ 30-Second Setup

```bash
# 1. Set your OpenAI API key
# Create .env file in function/ directory:
# OPENAI_API_KEY=sk-your-key-here

# 2. Start the server
cd "d:\projects\web tool bucket\resume-ai-helper\function"
node server.js

# 3. Open frontend
# Open in browser:
# d:\projects\web tool bucket\resume-ai-helper\frontend\public\index.html
```

✅ That's it! You're running!

---

## 📋 What You Have

**AI-Powered Resume Optimizer** that:
- ✅ Analyzes resumes for ATS compatibility (score 0-100)
- ✅ Identifies missing keywords & formatting issues
- ✅ Uses OpenAI to suggest improvements
- ✅ Generates optimized resumes (IIT Bombay or LaTeX)
- ✅ Beautiful responsive web UI
- ✅ Supports PDF/DOCX/text input
- ✅ Works with Google, Amazon, Microsoft, Meta, Tesla, IIT
- ✅ Supports Data Analyst, Software Engineer, Product Manager, Project Manager roles

---

## 🚀 QUICK COMMANDS

### Start Local Server (Development)
```bash
cd "d:\projects\web tool bucket\resume-ai-helper\function"
npm run build  # Compile TypeScript (if needed)
node server.js
```

Server will run at: `http://localhost:5001`

### Deploy to Firebase
```bash
cd "d:\projects\web tool bucket\resume-ai-helper"
firebase login
firebase deploy --only functions
```

### Rebuild TypeScript
```bash
cd "d:\projects\web tool bucket\resume-ai-helper\function"
npm run build
```

---

## 🔑 Get OpenAI API Key

1. Go to: https://platform.openai.com/api-keys
2. Sign up or login
3. Click "Create new secret key"
4. Copy the key
5. Create `.env` file in `function/` folder:
```
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxx
```

---

## 🌐 Access the App

### Local (Recommended)
1. Start server: `node server.js` in function/
2. Open: `d:\projects\web tool bucket\resume-ai-helper\frontend\public\index.html`

### Firebase
1. Deploy: `firebase deploy`
2. Open: `https://YOUR-PROJECT.firebaseapp.com`

---

## 📊 How It Works

```
Upload Resume
     ↓
Select Job Role & Company
     ↓
Click "Analyze Resume"
     ↓
[Backend Processing]
 • Parse resume
 • Analyze with ATS engine
 • Call OpenAI for suggestions
 • Generate improved resume
     ↓
View Results
 • ATS Score
 • Issues Found
 • AI Suggestions
 • Improved Resume
```

---

## 📁 Project Structure

```
resume-ai-helper/
├── function/              ← Backend (Node.js + TypeScript)
│   ├── src/              ← Source code
│   ├── lib/              ← Compiled JavaScript
│   ├── package.json      ← Dependencies
│   └── server.js         ← Local test server
│
├── frontend/             ← Frontend (HTML + CSS + JS)
│   └── public/
│       └── index.html    ← Complete app
│
├── shared/               ← Shared configs
│   ├── types/           ← TypeScript interfaces
│   ├── prompts/         ← OpenAI prompts
│   ├── skillMaps/       ← Role/company data
│   └── atsRules/        ← Scoring rules
│
└── README.md (this file)
```

---

## 🧪 Test the API

### Using cURL
```bash
curl -X POST http://localhost:5001/resumeAI \
  -H "Content-Type: application/json" \
  -d '{
    "resumeText": "Senior Developer with 5+ years experience",
    "jobRole": "Software Engineer",
    "company": "Google",
    "targetFormat": "IIT"
  }'
```

### Using JavaScript
```javascript
const response = await fetch('http://localhost:5001/resumeAI', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    resumeText: 'Your resume...',
    jobRole: 'Data Analyst',
    company: 'Microsoft'
  })
});
const result = await response.json();
console.log(result);
```

---

## ✨ Features

### Resume Analysis
- ✅ ATS compatibility score
- ✅ Missing keywords detection
- ✅ Formatting issues
- ✅ Length validation
- ✅ Structure checking
- ✅ Readability analysis

### AI Improvements (OpenAI)
- ✅ Bullet point enhancement
- ✅ Keyword suggestions
- ✅ Format tips
- ✅ Tone analysis

### Resume Generation
- ✅ IIT Bombay format (clean, ATS-optimized)
- ✅ Overleaf LaTeX (professional PDF)

### Customization
- ✅ 4+ job roles
- ✅ 6+ companies
- ✅ Custom job descriptions
- ✅ Text or file upload

---

## 🐛 Troubleshooting

**Port 5001 already in use?**
```bash
node server.js --port 5002
```

**OpenAI API error?**
- Check API key in `.env`
- Verify you have API credits
- Check rate limits

**Can't parse PDF?**
- Try a different PDF
- Use text input instead
- Check file isn't corrupted

**Frontend not connecting?**
- Ensure server is running
- Check API_URL in index.html
- Check CORS settings

---

## 📚 Key Technologies

- **Backend:** Node.js, Express, TypeScript, Firebase
- **Frontend:** HTML5, CSS3, JavaScript
- **AI:** OpenAI GPT-3.5-turbo
- **File Parsing:** pdf-parse, mammoth
- **Deployment:** Firebase Cloud Functions

---

## 🎯 Next Steps

1. **Get OpenAI API Key** (https://platform.openai.com)
2. **Create .env file** with your API key
3. **Run `node server.js`**
4. **Open `index.html` in browser**
5. **Start analyzing resumes!**

---

## 📞 Help

Check these files for more details:
- `IMPLEMENTATION_COMPLETE.md` - Full technical details
- `RUNNING_GUIDE.md` - Detailed setup instructions
- `PROJECT_REVIEW.md` - Project analysis

---

## ✅ Status

**Implementation:** COMPLETE ✅
**Testing:** READY ✅
**Deployment:** READY ✅
**Documentation:** COMPLETE ✅

---

**Ready to go! Run:**
```bash
cd function && node server.js
```

