# ⚡ QUICK LAUNCH GUIDE (2 MINUTES)

## 🚀 Get Running in 2 Minutes

### **Step 1: Get Your API Key (1 minute)**

Go to: https://platform.openai.com/api-keys

1. Sign up or login
2. Click "Create new secret key"
3. Copy the key (looks like: `sk-xxxxxxxxxxxxxxxxxxxx`)

### **Step 2: Set Up Environment (30 seconds)**

Open Notepad or VS Code and create a file:

**File path:** `d:\projects\web tool bucket\resume-ai-helper\function\.env`

**Content:**
```
OPENAI_API_KEY=sk-paste-your-key-here
```

Save the file.

### **Step 3: Start the Server (30 seconds)**

Open PowerShell or Command Prompt and run:

```bash
cd "d:\projects\web tool bucket\resume-ai-helper\function"
node server.js
```

You should see:
```
✅ Resume AI Helper server running on http://localhost:5001
📝 API Endpoint: http://localhost:5001/resumeAI
🏥 Health Check: http://localhost:5001/health
```

### **Step 4: Open the App (Instant)**

Open this file in your browser:
```
d:\projects\web tool bucket\resume-ai-helper\frontend\public\index.html
```

✅ **Done! You're running!**

---

## 📝 How to Use

1. **Upload Resume**
   - Click the upload button or paste text
   - Select a PDF/DOCX file or paste text

2. **Select Job Info**
   - Choose job role (Data Analyst, Software Engineer, etc.)
   - Choose company (Google, Amazon, Microsoft, etc.)

3. **Analyze**
   - Click "🚀 Analyze Resume"
   - Wait for analysis (2-3 seconds)

4. **View Results**
   - See ATS Score
   - Read issues and fixes
   - View AI suggestions
   - Copy improved resume

---

## 🎯 That's It!

Your AI Resume Optimizer is now running. You can:
- ✅ Upload resumes
- ✅ Get ATS analysis
- ✅ See AI improvements
- ✅ Generate optimized resumes
- ✅ Copy results

---

## 🆘 If Something Goes Wrong

### **"OPENAI_API_KEY not found"**
- Check that `.env` file exists in `function/` folder
- Check the API key is correct
- Restart `node server.js`

### **Port 5001 already in use**
- Kill other processes on port 5001
- Or use a different port: `node server.js --port 5002`

### **Can't connect to API**
- Make sure `node server.js` is still running
- Check that terminal shows "listening on"
- Try http://localhost:5001/health in browser

### **Frontend doesn't load**
- Open `index.html` directly from filesystem
- Or use Python: `cd frontend/public && python -m http.server 8000`
- Then visit `http://localhost:8000`

---

## 💡 Pro Tips

### Faster Testing with Sample Resume:
```
Paste this in the text area:

Senior Software Engineer with 5+ years experience in Node.js and React.
Led team of 8 developers.
Increased system performance by 40%.
```

Then select:
- Role: Software Engineer
- Company: Google

### View Raw JSON Response:
Open browser console (F12) and check Network tab when analyzing

### Test the API with cURL:
```bash
curl -X POST http://localhost:5001/resumeAI ^
  -H "Content-Type: application/json" ^
  -d "{\"resumeText\":\"Your resume\",\"jobRole\":\"Data Analyst\",\"company\":\"Google\"}"
```

---

## ✅ Verification

To verify everything is working:

1. **Check server is running:**
   ```bash
   Visit: http://localhost:5001/health
   Should see: {"status":"ok"}
   ```

2. **Check frontend loads:**
   ```bash
   Open: d:\projects\web tool bucket\resume-ai-helper\frontend\public\index.html
   Should see: Resume AI Helper UI
   ```

3. **Test API:**
   ```bash
   Use the UI to analyze a sample resume
   Should get: Results in seconds
   ```

---

## 🎓 Next Steps

### Short-term:
- [ ] Test with your actual resume
- [ ] Try different roles/companies
- [ ] Share results with others

### Medium-term:
- [ ] Deploy to Firebase: `firebase deploy`
- [ ] Add your custom companies/roles
- [ ] Integrate with LinkedIn

### Long-term:
- [ ] Add authentication
- [ ] Store resume history
- [ ] Build analytics dashboard
- [ ] Create mobile app

---

## 📊 What's Happening Behind the Scenes

When you click "Analyze Resume":

1. Your resume is sent to backend
2. Backend extracts text (if file)
3. ATS engine analyzes for:
   - Keywords matching
   - Formatting issues
   - Structure problems
   - Readability
4. OpenAI improves the content
5. Resume is generated in 2 formats
6. Results sent back to frontend
7. You see everything in UI

Total time: 2-3 seconds ⚡

---

## 🔗 Useful Links

- **OpenAI Dashboard:** https://platform.openai.com
- **API Keys:** https://platform.openai.com/api-keys
- **Firebase Console:** https://console.firebase.google.com
- **Documentation:** See README.md, RUNNING_GUIDE.md

---

## 💬 Questions?

Check these files:
- `README.md` - Quick overview
- `RUNNING_GUIDE.md` - Detailed setup
- `IMPLEMENTATION_COMPLETE.md` - Technical details
- `COMPLETION_SUMMARY.md` - What's included

---

## 🎉 You're All Set!

Run this now:
```bash
cd "d:\projects\web tool bucket\resume-ai-helper\function"
node server.js
```

Then open in browser:
```
d:\projects\web tool bucket\resume-ai-helper\frontend\public\index.html
```

**Start optimizing resumes! 🚀**

