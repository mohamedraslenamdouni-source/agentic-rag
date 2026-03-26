# Deployment Guide - Vercel

## Quick Deploy Instructions

### Step 1: Open PowerShell in the Frontend Directory
```powershell
cd "C:\Users\USER\Documents\React projects\agentic-rag\frontend"
```

### Step 2: Login to Vercel (if not already done)
```powershell
vercel login
```
- A browser window will open
- Click "Authorize" to connect your account
- Return to PowerShell - you should see: "Congratulations! You are now signed in."

### Step 3: Deploy to Production
```powershell
vercel --prod
```

You'll be asked 4 questions (just press Enter for defaults or select with arrow keys):

1. **Set up and deploy?** → Press `y` (or Enter)
2. **Which scope?** → Select your personal account (press Enter)
3. **Link to existing project?** → Press `n` (you're creating a new project)
4. **Project name?** → Press Enter to use default or type a custom name
5. **Directory?** → Press Enter (it should be `.`)
6. **Override settings?** → Press `n`

### Step 4: Wait for Deployment
The CLI will show you:
```
✓ Production: https://agentic-rag.vercel.app
```

**This is your public URL!** Share it with your friend! 🎉

---

## Troubleshooting

**If you get token errors:**
```powershell
vercel logout
vercel login
```

**To check your deployment status:**
Visit: https://vercel.com/dashboard

**To redeploy with changes:**
```powershell
npm run build
vercel --prod
```

---

## What Your Friend Can Do

1. Visit your Vercel URL
2. See the beautiful login page with 3D model
3. Enter their name
4. View the amazing chat interface with:
   - ✅ Rotating 3D spacecraft
   - ✅ Elegant golden sunset UI
   - ✅ Interactive orbit controls
   - ✅ Real-time 3D rendering

**Note:** Chat will show "Error connecting to webhook" when sending messages (webhook backend not deployed yet)

---

## Next Steps (Optional)
- Deploy webhook backend to Railway/Render for full functionality
- Add more 3D models
- Customize chat responses
- Add authentication system
