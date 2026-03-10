#!/bin/bash
# deploy.sh — Build and push to gh-pages branch
# Run from D:/portfolio-extracted
# Usage: bash deploy.sh

set -e

echo "→ Building..."
TEMP="/d/tmp" TMP="/d/tmp" TMPDIR="/d/tmp" LOCALAPPDATA="D:\\AppData\\Local" \
  node_modules/.bin/next build

echo "→ Deploying to gh-pages..."
cd out
rm -rf .git
git init
git checkout -b gh-pages
git config user.email "ashwinmcgithub@users.noreply.github.com"
git config user.name "Ashwin MC"
git add -A
git commit -m "deploy: $(date '+%Y-%m-%d %H:%M')"
git remote add origin https://github.com/ashwinmcgithub/portfolio.git
git push -f origin gh-pages
cd ..

echo "→ Triggering GitHub Pages rebuild..."
gh api repos/ashwinmcgithub/portfolio/pages/builds --method POST

echo "✓ Done! Site will be live in ~30 seconds."
echo "  https://ashwinmcgithub.github.io/portfolio/"
