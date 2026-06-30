# Deploy Power BI Dashboard to GitHub Pages

## Step 1: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Create a new repository named `powerbi-portfolio`
3. Choose "Public" for visibility
4. Do NOT initialize with README (we have one)
5. Click "Create repository"

## Step 2: Initialize Git & Push Code

```bash
# Navigate to project directory
cd /path/to/powerbi-portfolio

# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: Interactive Power BI Dashboard"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/powerbi-portfolio.git
git branch -M main
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - Source: Select "Deploy from a branch"
   - Branch: Select `main` and `/root` folder
   - Click **Save**

4. Wait 1-2 minutes for the build to complete
5. Your site will be live at: `https://YOUR_USERNAME.github.io/powerbi-portfolio/`

## Step 4: Update Vite Config for GitHub Pages

The project is already configured for GitHub Pages deployment. The build output will be in the `dist/` folder.

## Step 5: Build & Deploy

```bash
# Build the project
pnpm run build

# The dist folder is ready to be deployed
# GitHub Actions will automatically deploy on push to main
```

## Troubleshooting

- **Build fails**: Make sure all dependencies are installed (`pnpm install`)
- **Page not loading**: Check that GitHub Pages is enabled in Settings
- **CSS/JS not loading**: Ensure the base URL in vite.config.ts is correct

## Remove Manus Branding

The dashboard is now clean without any Manus watermarks. You can customize:
- Logo in `client/public/` 
- Title in `client/index.html`
- Colors in `client/src/index.css`

