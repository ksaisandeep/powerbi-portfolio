# Deploy Power BI Dashboard to GitHub Pages

This guide will help you deploy your interactive Power BI dashboard to GitHub Pages without any Manus branding.

## Prerequisites

- GitHub account (create one at [github.com](https://github.com) if needed)
- Git installed on your computer
- Node.js and pnpm installed

## Step-by-Step Deployment

### 1. Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `powerbi-portfolio`
3. Description: "Interactive Power BI Dashboard for Quick Commerce Data Analysis"
4. Choose **Public** (so others can view it)
5. **Do NOT** initialize with README, .gitignore, or license
6. Click **Create repository**

### 2. Clone the Project & Push to GitHub

```bash
# Navigate to the project directory on your computer
cd /path/to/powerbi-portfolio

# Initialize git (if not already initialized)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Interactive Power BI Dashboard"

# Add GitHub as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/powerbi-portfolio.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository: `https://github.com/YOUR_USERNAME/powerbi-portfolio`
2. Click **Settings** (top right)
3. Click **Pages** in the left sidebar
4. Under "Build and deployment":
   - **Source**: Select "Deploy from a branch"
   - **Branch**: Select `main` from dropdown
   - **Folder**: Select `/ (root)` from dropdown
   - Click **Save**

5. Wait 2-3 minutes for the build to complete
6. Your dashboard will be live at: `https://YOUR_USERNAME.github.io/powerbi-portfolio/`

### 4. Build the Project Locally (Optional)

To test the build before pushing:

```bash
# Install dependencies
pnpm install

# Build the project
pnpm run build

# The dist folder contains the production build
```

## Automatic Deployment with GitHub Actions

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys your dashboard whenever you push to the `main` branch.

**No additional setup needed!** Just push your code and GitHub Actions will handle the rest.

## Customization

### Change the Title

Edit `client/index.html`:
```html
<title>Your Dashboard Title Here</title>
```

### Change the Logo/Branding

1. Replace the logo in `client/public/favicon.ico`
2. Update the app title in `client/src/pages/Home.tsx`

### Change Colors

Edit `client/src/index.css` to modify the color scheme:
- Update CSS variables in `:root` section
- Modify Tailwind theme colors

## Troubleshooting

### Build Fails on GitHub

1. Check the Actions tab in your repository
2. Click the failed workflow to see error details
3. Common fixes:
   - Ensure `pnpm-lock.yaml` is committed
   - Check that all dependencies are listed in `package.json`

### Page Shows 404

1. Verify GitHub Pages is enabled in Settings → Pages
2. Check that the branch is set to `main`
3. Wait a few minutes for the build to complete

### CSS/JS Not Loading

1. The base URL is configured for GitHub Pages
2. If using a custom domain, update `vite.config.ts`

## Share Your Dashboard

Once deployed, share the link:
- **LinkedIn**: Post about your data analysis project
- **Portfolio**: Add to your resume/portfolio website
- **GitHub**: Link from your GitHub profile

## Next Steps

1. **Add More Data**: Replace `dashboardData.json` with your own data
2. **Customize Visualizations**: Modify chart types and colors in the tab components
3. **Add Filters**: Extend the filtering logic in `client/src/lib/filterUtils.ts`
4. **Deploy to Custom Domain**: Update GitHub Pages settings to use your own domain

## Support

For issues or questions:
1. Check the [GitHub Pages documentation](https://docs.github.com/en/pages)
2. Review the project README.md
3. Check browser console for errors (F12 → Console tab)

---

**Your dashboard is now ready to share with the world!** 🚀
