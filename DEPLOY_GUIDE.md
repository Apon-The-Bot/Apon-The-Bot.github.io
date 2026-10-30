# 🚀 Portfolio & Projects Deployment Guide

## 1. Deploy Your Portfolio to GitHub Pages

Your portfolio is completely ready inside:
`C:\Users\mdama\OneDrive\Desktop\apon-portfolio`

### Option A: Using GitHub CLI (`gh`) (Fastest)

1. Open PowerShell inside the folder:
   ```powershell
   cd "C:\Users\mdama\OneDrive\Desktop\apon-portfolio"
   ```
2. Switch active GitHub CLI account to `Apon-The-Bot`:
   ```powershell
   gh auth switch --user Apon-The-Bot
   ```
3. Initialize git and create the GitHub Pages repository:
   ```powershell
   git init
   git add index.html
   git commit -m "feat: initial release of modern AI & Full Stack portfolio"
   gh repo create Apon-The-Bot.github.io --public --source=. --push
   ```
4. Done! Your portfolio will be live at:
   `https://apon-the-bot.github.io/`

*(Note: If you rename your GitHub account to `apon-dev`, the repository should be `apon-dev.github.io` and the site will be `https://apon-dev.github.io/`)*

---

## 2. Publish Rice Leaf Disease Project to GitHub

1. Open PowerShell inside the project:
   ```powershell
   cd "D:\Shifat Vai - Duet\RiceLeafDiseaseProject"
   ```
2. Create `.gitignore` to avoid pushing heavy temp/cache files:
   ```powershell
   "__pycache__/`n*.log`n.venv/`n.idea/" | Out-File -Encoding utf8 .gitignore
   ```
3. Initialize and push:
   ```powershell
   git init
   git add .
   git commit -m "feat: initial commit of Rice Leaf Disease Detection System"
   gh repo create Rice-Leaf-Disease-Detection-AI --public --source=. --push
   ```

---

## 3. Publish BrickVision AI Project to GitHub

1. Open PowerShell inside:
   ```powershell
   cd "C:\Users\mdama\OneDrive\Desktop\Nixon Sir ( Research )\Bricks Classification"
   ```
2. Create `.gitignore`:
   ```powershell
   "__pycache__/`nlast_processed.jpg`ntemp/`n.idea/" | Out-File -Encoding utf8 .gitignore
   ```
3. Initialize and push:
   ```powershell
   git init
   git add .
   git commit -m "feat: initial commit of BrickVision AI Quality Grading System"
   gh repo create BrickVision-AI-Grading --public --source=. --push
   ```

---

## 4. Update Your Special GitHub Profile README

1. Create a repository with your exact username: `Apon-The-Bot/Apon-The-Bot` (or `apon-dev/apon-dev`).
2. Copy the contents of `GITHUB_PROFILE_README.md` and paste it into the repo's `README.md`.
3. This will display on your main GitHub profile page!
