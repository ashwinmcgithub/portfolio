# Changelog — Session Log

All work done on this project is logged here chronologically.

---

## Sessions 1 & 2 — Initial Build (2026-03-09)

### Converted vanilla HTML → Next.js 14
- Original site was a Three.js 3D space universe (index.html, 1442 lines)
- Preserved original as `universe-template` branch on GitHub
- Set up Next.js 14 + TypeScript + Tailwind CSS + shadcn/ui structure from scratch
  (create-next-app couldn't run in non-empty dir, so configured manually)

### Files created
- `app/layout.tsx` — root layout + metadata
- `app/page.tsx` — main page composing all sections
- `app/globals.css` — Tailwind base, CSS vars, loader spinner, scrollbar
- `components/ui/navbar.tsx` — fixed navbar, scroll-aware bg
- `components/ui/spline-hero.tsx` — full-screen hero with Spline 3D + spotlight
- `components/ui/splite.tsx` — lazy Spline loader with Suspense
- `components/ui/spotlight.tsx` — SVG spotlight glow (Aceternity style)
- `components/ui/card.tsx` — shadcn Card component
- `components/ui/projects-section.tsx` — 8 project cards grid
- `components/ui/about-section.tsx` — skills + stats
- `components/ui/contact-section.tsx` — email/WhatsApp/Instagram cards
- `lib/utils.ts` — cn() utility
- `tailwind.config.ts` — spotlight keyframe animation
- `postcss.config.mjs` — tailwindcss + autoprefixer
- `next.config.mjs` — output:'export', basePath:'/portfolio', trailingSlash:true
- `public/.nojekyll` — prevents Jekyll from blocking _next/ folder
- `public/demos/` — all 8 demo sites copied here for static export
- `deploy.sh` — one-command build + deploy script
- `DOCS.md` — full project documentation
- `.github/workflows/deploy.yml` — GitHub Actions (exists but currently unused)

### Dependencies installed
- next@14.2.35, react@19, react-dom@19
- @splinetool/react-spline, @splinetool/runtime
- framer-motion
- clsx, tailwind-merge, autoprefixer
- tailwindcss, typescript, postcss (devDeps)

### C: drive workaround
C: drive on dev machine is 100% full. All build/install commands must use:
```bash
TEMP="/d/tmp" TMP="/d/tmp" TMPDIR="/d/tmp" LOCALAPPDATA="D:\\AppData\\Local" npm run build
```
npm cache set to D:\npm-cache via ~/.npmrc

### Deployment setup
- GitHub Pages set to legacy mode, deploying from `gh-pages` branch
- Deploy done manually by building out/ then pushing to gh-pages via orphan git repo
- GitHub Pages API used to set build_type and source via `gh api`
- GitHub Actions workflow exists but is NOT the active deploy method
- gh CLI authenticated as ashwinmcgithub, scopes: repo, gist, read:org (no workflow scope)

---

## Session 3 — Bug Fix (2026-03-10)

### Bug: Site was blank after deployment
- **Root cause:** GitHub Pages runs Jekyll by default, which silently ignores all
  directories starting with `_`. The entire `_next/` folder (CSS + JS) was being
  blocked, so the page rendered as a blank black screen.
- **Fix:** Added `.nojekyll` empty file to `public/` folder so Next.js bakes it
  into every build's `out/` directory automatically.
- **Also fixed:** `out/.git` folder was leftover from previous deploy and was
  locking the directory, causing `EBUSY` build error. Removed it before rebuild.

### Changes made
- `public/.nojekyll` — created (empty file, critical for GitHub Pages)
- `deploy.sh` — created reusable build+deploy script
- `CHANGELOG.md` — this file, created for ongoing session logging
- `DOCS.md` — updated to include blank page bug + fix in known issues

### Deploy commands used this session
```bash
# Build
TEMP="/d/tmp" TMP="/d/tmp" TMPDIR="/d/tmp" LOCALAPPDATA="D:\\AppData\\Local" \
  node_modules/.bin/next build

# Deploy out/ to gh-pages branch
cd out/
rm -rf .git
git init && git checkout -b gh-pages
git config user.email "ashwinmcgithub@users.noreply.github.com"
git config user.name "Ashwin MC"
git add -A && git commit -m "deploy message"
git remote add origin https://github.com/ashwinmcgithub/portfolio.git
git push -f origin gh-pages
cd ..

# Trigger rebuild
gh api repos/ashwinmcgithub/portfolio/pages/builds --method POST
```
*Or just run: `bash deploy.sh`*

### Status at end of session
- Site is LIVE and working: https://ashwinmcgithub.github.io/portfolio/
- All sections rendering: navbar, hero (Spline 3D), projects, about, contact, footer
- All 8 demo links functional

---

## Session 4 — Projects section split (2026-03-10)

### What was done
- Split projects section into two sub-sections:
  1. **Completed** — Ultimate Fight Club featured as a full-width horizontal card with
     green "Live" badge, animated glow, and "Completed Project" pill
  2. **Demo Sites** — the 8 existing demo cards unchanged, each now has a "Demo" badge

### Files changed
- `components/ui/projects-section.tsx` — complete restructure:
  - Added `completedProjects` array (UFC entry, href is `"#"` placeholder — update with real URL)
  - Renamed old array to `demoProjects`
  - Added section dividers with labels and separators
  - UFC card: full-width, horizontal layout on md+, animated red glow, year badge
  - Demo cards: unchanged grid, added "Demo" badge top-left

### ⚠️ TODO
- Replace `href: "#"` in `completedProjects[0]` in `projects-section.tsx` with the real UFC site URL

### Status
- Live at https://ashwinmcgithub.github.io/portfolio/
- UFC shows under "Completed" heading with green pulsing Live indicator
- 8 demos show under "Demo Sites" heading

---

## Session 5 — Robot cursor tracking + mobile fix + card redesign (2026-03-10)

### What was done

#### 1. Robot follows cursor globally
- Changed `onPointerMove` (section-only) to `window.addEventListener("mousemove")`
  so the robot tracks the cursor anywhere on the page, not just when hovering the hero.
- Removed broken `rotateY`/`rotateX` CSS transforms (they're invisible without a
  CSS `perspective` context on the parent). Replaced with `translate3d` only,
  with larger values (±50px / ±30px) so the float effect is clearly visible.
- Added `touchmove` listener for mobile finger tracking.

#### 2. Robot visible on mobile
- **Root cause of bug:** section had `md:h-screen` — no height on mobile at all.
  Robot's `absolute inset-0` expanded to 0px, giving Spline nothing to render into.
- **Fix:** Section is now `h-screen` on ALL breakpoints.
- Robot is `absolute inset-0` (full-screen background layer) on mobile.
- Gradient overlay (`rgba` dark fade) keeps text readable over the robot.
- On desktop the layout stays side-by-side (text left, robot right).

#### 3. GradientCard component — project card redesign
- Created `components/ui/gradient-card.tsx` — new card with:
  - 3D tilt on hover (rotateX/Y from mouse position within card bounds)
  - Cursor-following radial glow spot inside the card
  - Per-card accent color gradient at top + bottom line
  - Noise texture overlay for depth
  - Framer Motion spring animations
- Replaced `SchemaCard` (imported from `schema-card-with-animated-wave-visualizer`)
  with `GradientCard` in `projects-section.tsx`.
- Swapped Lucide icon components for short text labels (`"UFC"`, `"FS"`, etc.)
  since GradientCard renders the icon as a text node inside a styled box.

#### 4. Ultimate Fight Club link
- Updated `completedProjects[0].href` from `"#"` to `"https://ultimatefightclub.in"`.
- Card now opens the live client site in a new tab.

### Files changed
- `components/ui/spline-hero.tsx` — global mouse/touch tracking, h-screen fix, mobile background layout
- `components/ui/gradient-card.tsx` — new file, full GradientCard component
- `components/ui/projects-section.tsx` — swapped SchemaCard → GradientCard, UFC href updated

### Commits (in order)
```
2dc3588 feat: make robot follow cursor globally across entire page
036e3a6 fix: robot cursor tracking visible + show robot on mobile
956f143 feat: replace SchemaCard with new GradientCard component
717b129 fix: show robot on mobile with explicit 420px height
515c094 fix: robot visible on mobile as full-screen background
87b699b feat: link Ultimate Fight Club card to ultimatefightclub.in
```

### Status
- Live at https://ashwinmcgithub.github.io/portfolio/
- Robot tracks cursor on desktop; tracks finger on mobile
- Robot visible on mobile as full-screen background behind text
- UFC card links to https://ultimatefightclub.in

---

## Template for future log entries

```
## Session N — Title (YYYY-MM-DD)

### What was done
- bullet points

### Files changed
- path/to/file.tsx — what changed and why

### Commands run
(any non-obvious commands)

### Status
- what's working / what's broken
```
