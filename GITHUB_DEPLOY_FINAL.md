# Deploy to GitHub Pages - Final Guide

## Step 1: Download Your Project

1. Click **Code** panel (right side)
2. Click **Download as ZIP**
3. Extract the ZIP file to your computer

---

## Step 2: Install Dependencies

Open **Terminal/Command Prompt** in your project folder and run:

```bash
pnpm install
```

If you don't have pnpm, install it first:
```bash
npm install -g pnpm
```

---

## Step 3: Build the Project

```bash
pnpm run build
```

This creates a `dist` folder with your website ready for deployment.

---

## Step 4: Create GitHub Repository

1. Go to **github.com/new**
2. Repository name: `powerbi-portfolio`
3. Choose **Public**
4. Click **Create repository**

---

## Step 5: Push to GitHub

In your Terminal, run these commands one by one:

```bash
git init
```

```bash
git add .
```

```bash
git commit -m "Power BI Dashboard"
```

```bash
git branch -M main
```

```bash
git remote add origin https://github.com/YOUR_USERNAME/powerbi-portfolio.git
```

⚠️ **Replace `YOUR_USERNAME` with your actual GitHub username!**

```bash
git push -u origin main
```

---

## Step 6: Enable GitHub Pages

1. Go to your repository: `github.com/YOUR_USERNAME/powerbi-portfolio`
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under "Build and deployment":
   - **Source:** Select "Deploy from a branch"
   - **Branch:** Select `main`
   - **Folder:** Select `/ (root)`
5. Click **Save**

⏳ **Wait 2-3 minutes for deployment**

---

## Step 7: Your Dashboard is Live! 🎉

Your website is now at:
```
https://YOUR_USERNAME.github.io/powerbi-portfolio/
```

---

## If You Get 404 Error

This means GitHub is still building. Wait a few more minutes and refresh the page.

---

## Update Your Dashboard

To make changes:

1. Edit files on your computer
2. Run:
   ```bash
   git add .
   git commit -m "Update"
   git push
   ```
3. GitHub automatically rebuilds and deploys

---

## Share Your Dashboard

- **LinkedIn:** Post the link and your insights
- **Resume:** Add to your portfolio
- **Friends:** Send them the link!

---

**That's it! Your Power BI dashboard is now live on the internet!** 🚀
