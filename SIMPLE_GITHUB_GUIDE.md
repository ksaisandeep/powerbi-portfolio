# Deploy to GitHub - Simple Guide

## What You Need
- GitHub account (free at github.com)
- Git installed on your computer
- Your project files

---

## Step 1: Create a GitHub Repository (5 minutes)

1. Go to **github.com** and log in
2. Click the **+** icon (top right) → **New repository**
3. Fill in:
   - **Repository name:** `powerbi-portfolio`
   - **Description:** Interactive Power BI Dashboard
   - **Public** (so everyone can see it)
4. Click **Create repository**

✅ **Done!** You now have an empty repository on GitHub.

---

## Step 2: Upload Your Code to GitHub (5 minutes)

Open **Terminal/Command Prompt** and run these commands:

```bash
cd /path/to/powerbi-portfolio
```

Then copy-paste these commands ONE BY ONE:

```bash
git init
```

```bash
git add .
```

```bash
git commit -m "My Power BI Dashboard"
```

```bash
git branch -M main
```

```bash
git remote add origin https://github.com/YOUR_USERNAME/powerbi-portfolio.git
```

⚠️ **IMPORTANT:** Replace `YOUR_USERNAME` with your actual GitHub username!

```bash
git push -u origin main
```

✅ **Done!** Your code is now on GitHub.

---

## Step 3: Make it Live on the Internet (5 minutes)

1. Go to your repository on GitHub: `github.com/YOUR_USERNAME/powerbi-portfolio`
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under "Build and deployment":
   - **Source:** Select "Deploy from a branch"
   - **Branch:** Select `main`
   - **Folder:** Select `/ (root)`
5. Click **Save**

⏳ Wait 2-3 minutes...

✅ **Done!** Your dashboard is now LIVE at:
```
https://YOUR_USERNAME.github.io/powerbi-portfolio/
```

---

## Step 4: Share Your Dashboard

Copy this link and share it:
- **LinkedIn:** Post about your data analysis project
- **Resume:** Add to your portfolio
- **Friends:** Send them the link!

---

## Troubleshooting

**"Command not found: git"**
- Install Git from git-scm.com

**"Repository not found"**
- Check that YOUR_USERNAME is correct
- Make sure you created the repository on GitHub

**"Page shows 404"**
- Wait a few more minutes for GitHub to build
- Check that Pages is enabled in Settings

**"Code changes not showing"**
- Run these commands to update:
  ```bash
  git add .
  git commit -m "Update"
  git push
  ```

---

## That's It! 🎉

Your Power BI dashboard is now live on the internet without any Manus branding!

Every time you make changes and run `git push`, your website updates automatically.
