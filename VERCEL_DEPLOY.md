# 🚀 Vercel Deployment Guide

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Easiest)
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository: `https://github.com/jatinpetwal914/ATS-Resume-checker.git`
4. Vercel auto-detects the configuration from `vercel.json`
5. Set environment variables:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `GEMINI_API_KEY`: Your Gemini API key
6. Click "Deploy"

### Option 2: Deploy via CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
cd d:\projects\web tool bucket\resume-ai-helper
vercel --prod
```

## Environment Variables

Add these to your Vercel project settings:
- `OPENAI_API_KEY` - Your OpenAI API key
- `GEMINI_API_KEY` - Your Google Generative AI API key

## Project Structure for Vercel

```
resume-ai-helper/
├── api/                    # Vercel Serverless Functions
│   ├── resumeAI.ts        # Main API endpoint
│   └── health.ts          # Health check endpoint
├── frontend/
│   └── public/
│       └── index.html     # Frontend SPA
├── function/
│   ├── src/              # TypeScript source
│   ├── lib/              # Compiled JavaScript
│   └── package.json
├── vercel.json           # Vercel configuration
├── package.json          # Root package.json
└── .vercelignore         # Files to ignore during build
```

## How It Works

1. **API Routes** (`/api/` folder):
   - Vercel automatically converts TypeScript files to serverless functions
   - `api/resumeAI.ts` → `https://your-domain.vercel.app/api/resumeAI`
   - `api/health.ts` → `https://your-domain.vercel.app/api/health`

2. **Frontend**:
   - Served from `frontend/public/`
   - Automatically detects Vercel environment and uses `/api/resumeAI`

3. **Rewrites**:
   - All requests go to the correct handler via `vercel.json` rewrites

## Testing After Deployment

```bash
# Health check
curl https://your-domain.vercel.app/api/health

# API call
curl -X POST https://your-domain.vercel.app/api/resumeAI \
  -H "Content-Type: application/json" \
  -d '{
    "resumeText": "Senior Developer with 5+ years experience",
    "jobRole": "Software Engineer",
    "company": "Google"
  }'
```

## Troubleshooting

### 404 Errors
- Check `vercel.json` configuration
- Ensure API TypeScript files are in `api/` folder
- Verify function names match the rewrite rules

### Build Failures
- Check build logs in Vercel dashboard
- Ensure all environment variables are set
- Verify function dependencies are in `function/package.json`

### Environment Variables Not Working
- Go to Project Settings → Environment Variables
- Add variables and redeploy
- Make sure browser sets correct API_URL

---

**Ready to deploy? Just push to GitHub and Vercel will auto-deploy!**
