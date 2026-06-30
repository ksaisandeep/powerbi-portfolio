# Files to Download - Quick Reference

## How to Download Everything

### Option 1: Download as ZIP (Easiest)
1. Go to the **Code** panel in the Management UI (right side)
2. Click **Download as ZIP** button
3. Extract the ZIP file to your computer
4. Done! All files are ready to use.

---

### Option 2: Download Individual Folders (If you prefer)

Download these folders/files in this order:

#### 1. **client/** folder (Most Important)
   - Contains all your dashboard code
   - Includes React components, styles, and data

#### 2. **package.json** file
   - Lists all dependencies your project needs
   - Required for installation

#### 3. **.github/** folder
   - Contains GitHub Actions workflow for automatic deployment
   - Optional but recommended

#### 4. **pnpm-lock.yaml** file
   - Locks dependency versions
   - Prevents compatibility issues

#### 5. **vite.config.ts** file
   - Build configuration
   - Required for production build

#### 6. **tsconfig.json** file
   - TypeScript configuration
   - Required for building

#### 7. **SIMPLE_GITHUB_GUIDE.md** file
   - Step-by-step deployment instructions
   - Read this first!

---

## Folder Structure After Download

Your folder should look like this:

```
powerbi-portfolio/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── lib/
│   │   └── ...
│   └── index.html
├── .github/
│   └── workflows/
│       └── deploy.yml
├── package.json
├── pnpm-lock.yaml
├── vite.config.ts
├── tsconfig.json
├── SIMPLE_GITHUB_GUIDE.md
└── ... (other config files)
```

---

## What NOT to Download

❌ **Don't download these:**
- `node_modules/` folder (will be created automatically)
- `.manus/` folder (Manus-specific)
- `.manus-logs/` folder (logs)

---

## Next Steps

1. Download all files as ZIP
2. Extract to your computer
3. Open terminal in the folder
4. Run: `npm install -g pnpm` (if you don't have pnpm)
5. Run: `pnpm install` (installs dependencies)
6. Follow `SIMPLE_GITHUB_GUIDE.md` to deploy!

---

## Need Help?

If you get stuck:
1. Check `SIMPLE_GITHUB_GUIDE.md` for troubleshooting
2. Make sure you have Git and Node.js installed
3. Make sure pnpm is installed globally
