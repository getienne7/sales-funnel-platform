@echo off
echo Setting up GitHub Pages deployment for Sales Funnel Platform...
echo.

echo Step 1: Checking if git is initialized...
if not exist .git (
    echo Initializing git repository...
    git init
    echo Git repository initialized.
) else (
    echo Git repository already exists.
)

echo.
echo Step 2: Adding files to git...
git add .
git status

echo.
echo Step 3: Creating initial commit...
git commit -m "Initial commit: Sales Funnel Platform with GitHub Pages setup"

echo.
echo ========================================
echo GitHub Pages Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Create a repository on GitHub
echo 2. Add the remote origin:
echo    git remote add origin https://github.com/yourusername/your-repo-name.git
echo 3. Push to GitHub:
echo    git branch -M main
echo    git push -u origin main
echo 4. Enable GitHub Pages in repository settings
echo 5. Select "GitHub Actions" as the source
echo.
echo Your site will be available at:
echo https://yourusername.github.io/your-repo-name
echo.
echo For detailed instructions, see DEPLOYMENT.md
echo.
pause
