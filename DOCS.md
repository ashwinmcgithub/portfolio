# Portfolio — Full Project Documentation

> Written for handoff to another AI or developer. Covers everything: what the project is, what was built, how it deploys, known issues, and how to continue working on it.

---

## 1. What This Project Is

A personal portfolio website for **Ashwin MC** (GitHub: `ashwinmcgithub`), a freelance web developer based in Kerala, India.

**Live URL:** `https://ashwinmcgithub.github.io/portfolio/`

The site showcases 8 client demo projects and presents the developer's skills and contact info.

---

## 2. History — What Was Here Before

The original site was a **vanilla HTML + Three.js** interactive 3D space universe (`index.html`, 1,442 lines). It had:
- 12 scrollable sections, each a planet in 3D space
- GSAP ScrollTrigger for scroll-driven camera animation
- Lenis smooth scrolling
- Procedural planet textures, bloom post-processing
- No build step — pure static HTML/CSS/JS

**That original code is preserved** on the `universe-template` branch:
```
https://github.com/ashwinmcgithub/portfolio/tree/universe-template
```
It can be reused for other clients as a standalone template (copy `index.html` + `textures/` + `demos/`).

---

## 3. Current Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 14.2.35 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 3.4.x |
| Components | shadcn/ui structure | manual |
| 3D Hero | Spline (`@splinetool/react-spline`) | 4.x |
| Animations | framer-motion | 12.x |
| Utilities | clsx + tailwind-merge | latest |
| Deployment | GitHub Pages (static export) | — |

---

## 4. Repository Structure

```
portfolio/                         ← root (D:\portfolio-extracted)
│
├── app/                           ← Next.js App Router
│   ├── layout.tsx                 ← Root layout, metadata, global CSS import
│   ├── page.tsx                   ← Main page — imports all sections
│   └── globals.css                ← Tailwind base + CSS vars + loader spinner + scrollbar
│
├── components/ui/                 ← All UI components (shadcn convention)
│   ├── navbar.tsx                 ← Fixed top navbar, scroll-aware bg, logo + links
│   ├── spline-hero.tsx            ← Full-screen hero: Spline 3D + spotlight + text + CTAs
│   ├── splite.tsx                 ← Lazy-loaded Spline scene wrapper (Suspense + loader)
│   ├── spotlight.tsx              ← SVG spotlight glow effect (Aceternity UI style)
│   ├── card.tsx                   ← shadcn Card component
│   ├── projects-section.tsx       ← Projects grid — 8 client project cards
│   ├── about-section.tsx          ← About + skill bars + stats + tools
│   └── contact-section.tsx        ← Contact cards (Email, WhatsApp, Instagram) + CTA
│
├── lib/
│   └── utils.ts                   ← cn() helper using clsx + tailwind-merge
│
├── public/
│   ├── demos/                     ← Static HTML demo sites (copied here for Next.js export)
│   │   ├── food-street/           ← Old Monk Food Street (5 pages + CSS + JS)
│   │   ├── ayurveda/              ← AyurLife Wellness (2 pages)
│   │   ├── beauty-salon/          ← Elegance Studio (1 page)
│   │   ├── ca-firm/               ← PrimeLedger & Co. (1 page)
│   │   ├── dental/                ← BrightSmile Dental (2 pages)
│   │   ├── driving-school/        ← Riders Point (1 page)
│   │   ├── gym/                   ← FitCore Fitness (1 page)
│   │   └── printing/              ← PrintHub Digital Press (1 page)
│   └── textures/                  ← Planet textures (kept from old Three.js site)
│
├── demos/                         ← Same demo files at root (source copy, not for build)
│
├── .github/workflows/deploy.yml   ← GitHub Actions (currently broken, see §8)
├── next.config.mjs                ← output:'export', basePath:'/portfolio'
├── tailwind.config.ts             ← Tailwind + spotlight keyframe animation
├── postcss.config.mjs             ← tailwindcss + autoprefixer
├── tsconfig.json                  ← Standard Next.js TS config, paths: @/* → ./*
├── package.json                   ← All dependencies
└── .gitignore                     ← Excludes node_modules, .next, out/, generated files
```

---

## 5. Page Layout (app/page.tsx)

The page is composed of five components stacked vertically:

```
<Navbar />          ← fixed, always on top
<SplineHero />      ← full viewport height hero
<ProjectsSection /> ← project cards grid  (id="projects")
<AboutSection />    ← skills + stats       (id="about")
<ContactSection />  ← contact links        (id="contact")
<footer />          ← simple inline footer
```

---

## 6. Key Component Details

### `spline-hero.tsx`
- Full `h-screen` section with black background
- Left half: status badge, gradient heading, description, two CTA buttons, tech stack pills
- Right half: `<SplineScene>` (hidden on mobile with `hidden md:flex`)
- Spline scene URL: `https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode`
- Scroll indicator arrow at bottom center
- Grid overlay at 3% opacity for texture

### `splite.tsx`
- Uses React `lazy()` + `Suspense` to load Spline only when needed
- Fallback shows a CSS spinner (`.loader` class defined in `globals.css`)
- Props: `scene` (URL string), `className` (optional)

### `spotlight.tsx`
- SVG-based spotlight glow (Aceternity UI style)
- Uses `animate-spotlight` Tailwind animation defined in `tailwind.config.ts`
- Props: `className`, `fill` (color string, defaults to white)

### `navbar.tsx`
- Client component — uses `useEffect` + `useState` for scroll detection
- Transparent when at top, `bg-black/80 backdrop-blur-md` when scrolled past 40px
- Logo: white diamond icon + "WebCraft Studio" text
- Links: Work → `#projects`, About → `#about`, Contact → `#contact`
- CTA button: "Hire Me" → `#contact`

### `projects-section.tsx`
- Client component with `useState` for hover tracking
- 8 projects, each with: gradient bg, emoji icon, category, title, description, tags, page count badge, arrow icon
- All demo links use absolute paths with `/portfolio/` prefix (required for GitHub Pages basePath)
- Cards open in `target="_blank"`

### `about-section.tsx`
- Server component (no hooks)
- Left: heading, two paragraphs, 2×2 stats grid
- Right: 6 skill bars (gradient purple→cyan), tool badges
- Stats: 10+ projects, 100% satisfaction, 3+ years, ∞ coffee

### `contact-section.tsx`
- Server component
- 3 contact cards: Email, WhatsApp, Instagram
- Large primary CTA button: "Start a Conversation" → mailto
- **Update the email/WhatsApp/Instagram links** — currently placeholders

---

## 7. Styling System

### CSS Variables (globals.css)
```css
--background: 0 0% 3%       /* near-black */
--foreground: 0 0% 98%      /* near-white */
--card: 0 0% 6%             /* slightly lighter black */
--muted-foreground: 0 0% 60%
--border: 0 0% 14%
--radius: 0.75rem
```

### Tailwind Custom Additions (tailwind.config.ts)
```js
animation: { spotlight: "spotlight 2s ease .75s 1 forwards" }
keyframes: {
  spotlight: {
    "0%":   { opacity: 0, transform: "translate(-72%, -62%) scale(0.5)" },
    "100%": { opacity: 1, transform: "translate(-50%, -40%) scale(1)" }
  }
}
```

---

## 8. Deployment — How It Works

### Current method: `gh-pages` branch → GitHub Pages (legacy mode)

The site is deployed by **directly pushing the built `out/` folder** to a `gh-pages` branch. GitHub Pages is configured in **legacy mode** to serve from that branch.

**Build + deploy process (run locally):**
```bash
# Must redirect temp dirs to D: drive on this machine (C: drive is 100% full)
TEMP="/d/tmp" TMP="/d/tmp" TMPDIR="/d/tmp" LOCALAPPDATA="D:\\AppData\\Local" npm run build

# Then from inside out/ directory:
cd out/
git init
git checkout -b gh-pages
git config user.email "ashwinmcgithub@users.noreply.github.com"
git config user.name "Ashwin MC"
git add -A
git commit -m "deploy: <message>"
git remote add origin https://github.com/ashwinmcgithub/portfolio.git
git push -f origin gh-pages

# Trigger GitHub Pages rebuild via API:
gh api repos/ashwinmcgithub/portfolio/pages/builds --method POST
```

### GitHub Actions (`.github/workflows/deploy.yml`) — NOT currently used
The workflow file exists on `main` but the GitHub Pages source is set to `gh-pages` branch (legacy mode), so Actions is bypassed. The workflow was written to use `npm install --legacy-peer-deps` → `npm run build` → upload `out/` → deploy.

To switch to Actions-based deployment:
1. `gh api repos/ashwinmcgithub/portfolio/pages --method PUT --field build_type="workflow"`
2. Make sure the workflow file is correct (the local copy uses `npm install`, the GitHub copy uses `npm ci` — they differ)

### GitHub Pages settings (as of last session):
```json
{
  "build_type": "legacy",
  "source": { "branch": "gh-pages", "path": "/" }
}
```

---

## 9. Git Branches

| Branch | Contents |
|--------|----------|
| `main` | Next.js source code (what you edit) |
| `gh-pages` | Built static files from `out/` (what GitHub Pages serves) |
| `universe-template` | Original Three.js space universe (preserved for reuse) |

---

## 10. Known Issues & Things To Fix

### Contact info is placeholder
In `components/ui/contact-section.tsx`, update:
- Email: `ashwinmc@example.com` → real email
- WhatsApp: `https://wa.me/919999999999` → real number
- Instagram: `https://instagram.com/ashwinmc` → real handle

### GitHub Actions workflow is broken/unused
The `.github/workflows/deploy.yml` on GitHub still uses `npm ci` (which can fail). The local copy uses `npm install`. They are out of sync. If switching to Actions-based deploy, update the workflow on GitHub to use `npm install --legacy-peer-deps`.

### C: Drive is 100% full on dev machine
All build commands must redirect temp/cache to D: drive:
```bash
TEMP="/d/tmp" TMP="/d/tmp" TMPDIR="/d/tmp" LOCALAPPDATA="D:\\AppData\\Local" npm run build
```
npm cache is configured to `D:\npm-cache` via `~/.npmrc`.

### Next.js version pinned to 14.x
Next.js 15/16 fails on this machine because the SWC native binary can't download to C: drive and the WASM fallback crashes. Stay on `next@^14.2.35`.

### `demos/` folder is duplicated
Demo HTML files exist in both `/demos/` (root, source copy) and `/public/demos/` (for Next.js static export). Both should be kept in sync when updating demos. The build only uses `public/demos/`.

### ⚠️ CRITICAL: `.nojekyll` must exist in `public/`
GitHub Pages runs Jekyll by default, which silently ignores ALL directories starting
with `_`. This blocks the entire `_next/` folder (CSS + JS), making the site render
as a blank black page. The file `public/.nojekyll` (empty file) tells GitHub Pages
to skip Jekyll. It is already present and baked into every build automatically.
**Never delete `public/.nojekyll`.**

### `out/.git` lock issue
After running `deploy.sh`, the `out/` directory contains a `.git` folder from the
deploy process. If you run `npm run build` again without removing it, you get:
`EBUSY: resource busy or locked, rmdir 'out'`
Fix: `rm -rf out/.git` before building. The `deploy.sh` script handles this automatically.

### CDN cache delay
After pushing to `gh-pages`, GitHub's CDN can take 10–30 minutes to show the new version. The build API confirms `"status": "built"` immediately, but browsers may serve cached content for a while.

---

## 11. How To Add a New Project

1. Add the demo HTML files to `public/demos/<project-name>/`
2. Also copy to `demos/<project-name>/` (to keep root in sync)
3. Add an entry to the `projects` array in `components/ui/projects-section.tsx`:
```ts
{
  title: "Project Name",
  category: "Category",
  description: "One or two sentence description.",
  href: "/portfolio/demos/<project-name>/index.html",
  tags: ["HTML", "CSS"],
  accent: "#hexcolor",
  bg: "from-[#darkcolor] to-[#darkercolor]",
  icon: "🔥",
  pages: 1,
}
```
4. Build and deploy (see §8)

---

## 12. How To Run Locally

```bash
cd D:/portfolio-extracted

# Install (first time or after pulling)
npm install --legacy-peer-deps

# Dev server
TEMP="/d/tmp" LOCALAPPDATA="D:\\AppData\\Local" npm run dev
# → http://localhost:3000/portfolio

# Production build
TEMP="/d/tmp" TMP="/d/tmp" TMPDIR="/d/tmp" LOCALAPPDATA="D:\\AppData\\Local" npm run build
# → generates out/ folder
```

---

## 13. Environment Notes (This Machine)

| Item | Detail |
|------|--------|
| OS | Windows 11 (MINGW64 bash shell) |
| Node | v24.13.0 |
| npm cache | `D:\npm-cache` (C: drive is full) |
| Project path | `D:\portfolio-extracted` |
| Git credentials | via `gh` CLI (`gh auth status` shows `ashwinmcgithub`) |
| GitHub CLI | `gh` v2.86.0, authenticated, scopes: `gist, read:org, repo` |
| Missing scope | `workflow` — cannot push `.github/workflows/` files via CLI |

---

## 14. Spline Scene

The 3D robot scene in the hero is loaded from Spline's CDN:
```
https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode
```
This is a public Spline scene (interactive robot). To replace it with a custom scene:
1. Create/export a scene from [spline.design](https://spline.design)
2. Publish it and copy the `.splinecode` URL
3. Update the `scene` prop in `components/ui/spline-hero.tsx`

---

## 15. Quick Reference — All Links

| Resource | URL |
|----------|-----|
| Live site | `https://ashwinmcgithub.github.io/portfolio/` |
| GitHub repo | `https://github.com/ashwinmcgithub/portfolio` |
| main branch | `https://github.com/ashwinmcgithub/portfolio/tree/main` |
| gh-pages branch | `https://github.com/ashwinmcgithub/portfolio/tree/gh-pages` |
| universe-template | `https://github.com/ashwinmcgithub/portfolio/tree/universe-template` |
| GitHub Actions | `https://github.com/ashwinmcgithub/portfolio/actions` |
| Pages settings | `https://github.com/ashwinmcgithub/portfolio/settings/pages` |
