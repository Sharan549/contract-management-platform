# GitHub Upload Guide for EURUSYS Contract Management Platform

## Prerequisites

### Install Git (if not already installed)

1. **Download Git for Windows**: https://git-scm.com/download/win
2. Run the installer with default settings
3. **Verify installation**: Open a new terminal and run:
   ```bash
   git --version
   ```

---

## Quick Setup Instructions

Follow these steps to upload your project to GitHub:

### Step 1: Initialize Git Repository (if not already done)

Open your terminal in the project directory and run:

```bash
git init
```

### Step 2: Stage All Files

```bash
git add .
```

### Step 3: Make Your First Commit

```bash
git commit -m "Initial commit: EURUSYS Contract Management Platform"
```

### Step 4: Create Repository on GitHub

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **+** icon in the top right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `eurusys-contract-management-platform` (or your preferred name)
   - **Description**: `Professional Contract Management Platform for EURUSYS (UAE)`
   - **Visibility**: Choose **Public** (required for submission) or **Private**
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

### Step 5: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add the remote repository (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/eurusys-contract-management-platform.git

# Verify the remote was added
git remote -v
```

### Step 6: Push Your Code to GitHub

```bash
# Push to GitHub (main branch)
git branch -M main
git push -u origin main
```

If prompted, enter your GitHub username and password (or use a Personal Access Token).

---

## Alternative: Using GitHub CLI (gh)

If you have GitHub CLI installed:

```bash
# Login to GitHub
gh auth login

# Create repository and push in one command
gh repo create eurusys-contract-management-platform --public --source=. --remote=origin --push
```

---

## Complete Command Sequence (Copy-Paste)

```bash
# Navigate to project directory (if not already there)
cd "C:\Users\Admin\Documents\Contract Management Platform"

# Initialize git
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit: EURUSYS Contract Management Platform - Professional contract management solution with React and TypeScript"

# Rename branch to main (if needed)
git branch -M main

# Add remote (REPLACE USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/eurusys-contract-management-platform.git

# Push to GitHub
git push -u origin main
```

---

## Authentication Notes

### If using HTTPS:
- GitHub may ask for username and password
- **Note**: GitHub no longer accepts passwords for HTTPS. Use a **Personal Access Token** instead:
  1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
  2. Generate new token with `repo` permissions
  3. Use the token as your password when pushing

### If using SSH:
```bash
# Use SSH URL instead
git remote set-url origin git@github.com:USERNAME/eurusys-contract-management-platform.git
```

---

## After Uploading: Verify

1. Go to your GitHub repository page
2. Verify all files are present
3. Check that README.md displays correctly
4. Verify package.json and other config files are there

---

## Troubleshooting

### If you get "remote origin already exists":
```bash
git remote remove origin
git remote add origin https://github.com/USERNAME/eurusys-contract-management-platform.git
```

### If you need to update existing repository:
```bash
git add .
git commit -m "Update: Enhanced UI and EURUSYS branding"
git push
```

### If files are too large:
Make sure `.gitignore` includes:
- `node_modules/`
- `dist/`
- `.env` files

---

## Submission Link

After your repository is public, submit it at:
**https://forms.gle/UBgZW7bKiWbFd6RU9**

Make sure your repository includes:
✅ README.md with setup instructions
✅ All source code
✅ package.json
✅ Working application
