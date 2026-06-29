# Handoff — refine the apex `/brand` page sections to the Academy aesthetic

**Status:** not started · **Owner:** Josh · **Repo:** `c:\zzz\otd\otd-site-deploy` (the APEX site,
onethousanddrones.com) · **Branch:** `feat/brand-page` (UNCOMMITTED working tree — see Durability).
**You MUST use the `frontend-design` skill** for every sandbox. The Academy's live design is the
**source of truth** for the aesthetic.

## What exists now (read before acting)

The apex `/brand` page was rebuilt this session into a comprehensive 16-section dark brand guide that
mirrors the Academy's console aesthetic. Files:

- **`app/brand/page.tsx`** — the page. 16 sections (hero via the shared `PageHeader`, then 01–16).
- **`app/globals.css`** — the apex design system (ported verbatim from the Academy globals). The
  brand-page-specific recipes are a big block near the end: `.swatch*`, `.type-row/.spec-*`,
  `.logo-*`, `.usage-*`, `.doc*` (the document/application mockups), `.sig`, `.bcback`, `.inv-total`,
  `.av*` (social avatars), `.bhex` (honeycomb specimen), `.qref`, plus a base `.bee { 1.5rem }`.
- **`app/fonts.ts` + `app/layout.tsx`** — Saira Condensed wired as `--font-numeral` (the 4th face).
- Brand link is in `app/components/SiteHeader.tsx` (NAV) + `app/components/SiteFooter.tsx` (Company).
- The old static guide `public/brand.html` was deleted (the React route replaces it).

## The task

Josh reviewed the rebuild and wants **9 specific sections refined** — they read too generic / not yet
up to the Academy's standard. For **EACH** of the 9 sections, **build a sandbox of 10 design options**
(standalone HTML in `c:\tmp\`, the same way the quiz/font sandboxes were done this session), refined to
the Academy console aesthetic. Then Josh picks one per section and you build the chosen design into
`app/brand/page.tsx` (+ `globals.css`).

### The 9 sections (numbers as they appear on the CURRENT rebuilt page → names)

Verify against the live page, but the mapping is:

| # | Section | What it is now |
|---|---------|----------------|
| 03 | **Logo system** | 3 lockups (on light / on dark / mono) + the OTD ACADEMY sub-brand cards |
| 06 | **Letterhead** | light document mockup (`.doc`) |
| 08 | **Business card** | light front + dark back (`.doc`, `.doc.dark`, `.bcback`) |
| 09 | **Proposal / report cover** | light document mockup |
| 10 | **Slide deck title** | dark 16:9 mockup (`.doc.dark`) |
| 11 | **Document header & footer** | light multi-page strip mockup |
| 12 | **Envelope (#10)** | light envelope mockup |
| 14 | **Internal memo** | light document mockup |
| 15 | **Invoice** | light document mockup with a Saira `[$X,XXX.XX]` total |

(NOT in scope: 01 Color, 02 Typography, 04 Honeycomb signature, 05 Usage, 07 Email signature,
13 Social/favicon, 16 Quick reference — Josh considers those fine.)

### Approach per section

1. **Use the frontend-design skill** (announce it). Pin the subject (a print/digital brand artifact in
   OTD's mission-control identity), then make deliberate, non-templated choices.
2. Build ONE standalone HTML sandbox per section with **10 distinct options**, rendered in the OTD
   palette + the four brand faces (Bebas / Saira numerals / Space Mono / Lora). Load fonts from Google
   Fonts in the sandbox (`Bebas+Neue`, `Saira+Condensed:wght@700;800`, `Space+Mono`, `Lora`).
3. Screenshot it with Playwright (see Verification), show Josh, let him pick.
4. Build the chosen option into `app/brand/page.tsx` + `globals.css`, verify, move to the next section.

Sandboxes can run one section at a time (9 sandboxes total) — confirm cadence with Josh; he may want
them one-by-one with a pick between each, or several up front.

## The Academy aesthetic = source of truth (the rules)

These are LOCKED from this session's work on the Academy + apex (see the
`courses-build-guide-standard` memory for the full history):

- **No generic bordered boxes / "AI-looking" card grids.** Match the hexagon + console signature.
  (Josh rejected exactly this twice this session.)
- **The honeycomb is the one bold signature** — number-hero hexes, gold on deep space. Lean on it.
- **Console, not corporate**: mono eyebrows, gold hairlines, gate tags, glass panels on the
  engineering-paper field. Instrument readouts over decoration.
- **NO em-dashes** anywhere (voice rule — the page's own callout says so). Sentence case. Evidence
  over adjectives.
- **The four faces, one job each**: Bebas (display/headlines), **Saira Condensed** (display numerals
  only — digits/stats/prices, weight 800), Space Mono (labels/data/chrome), Lora (prose).
- **Print artifacts are inherently light** (white paper). The letterhead/business-card-front/proposal/
  envelope/memo/invoice/doc-header are LIGHT document cards on the dark page — that's correct, but the
  *framing, spacing, type, and detailing* should still feel unmistakably OTD (not a generic Word doc).
  The slide title + business-card back + dark social are dark.
- The Academy components to mine for ideas: `c:\zzz\project-foundry\src\components\guide\GuideHoneycomb.tsx`,
  `GuideStepper.tsx`, `src/components/skill-tree/{SkillHoneycomb,PathBanner,PathHoneycomb}.tsx`,
  and the new `QuizBlock.tsx` (hex-node grade-as-you-go). Academy CSS: `src/app/globals.css` (`.gh-*`,
  `.phex-*`, `.qzh-*`, `.gs-*`, `--font-numeral`).

## Verification (how to see the page + sandboxes)

- **Apex dev server**: `cd c:\zzz\otd\otd-site-deploy` then run `next dev` on a free port (academy holds
  3000/3001; use **3002**). GOTCHA: **Turbopack allows ONE `next dev` per dir** — if a stale one is
  running it errors ("Another next dev server is already running"); kill its PID first
  (`taskkill /PID <pid> /F`). Launch it as a background/run-in-background process (a foreground one
  blocks; a harness-detached one can die). Poll `http://localhost:3002/brand` for HTTP 200.
- **Build gate**: `pnpm build` (Next 16 / Turbopack) — must stay green (`○ /brand` prerendered, TS
  clean) before declaring a section done.
- **Screenshots**: the apex has no Playwright; reuse the Academy's via an absolute import in a scratch
  `.mjs` run from anywhere:
  `import { chromium } from "file:///c:/zzz/project-foundry/node_modules/playwright/index.mjs"`.
  Sandboxes are `file:///c:/tmp/<name>.html`; the page is `http://localhost:3002/brand`. Screenshot
  long pages by scrolling viewport chunks (full-page clips overflow the image API; element shots > a
  certain height get rejected — keep crops modest).

## Gotchas (learned this session)

- **`BrandMark` renders at its intrinsic (huge) size** unless a `.X .bee` CSS rule sizes it. There's a
  base `.bee { height:1.5rem; width:1.5rem }` now; any new context needs its own size rule or inherits
  that. `BrandMark` only accepts `className` (no `style`/`width` props).
- **Dark elements on the dark page are invisible** without a border (e.g. the dark social avatars
  needed a `panel-border` hairline). Mind contrast.
- The apex uses **hand-authored CSS classes, not Tailwind**. Add recipes to `globals.css`.
- Page headers use the shared **`PageHeader` component** (`app/components/PageHeader.tsx`) — title-rule
  + `.ord` gold eyebrow + auto ivory→gold `.bench-hero` title + Lora `.subhead`. Don't hand-roll headers.
- The apex auto-deploys via **Vercel from `main`** — so nothing ships until `feat/brand-page` is merged
  (do NOT merge without Josh's go-ahead).

## Durability / state

- This work is **UNCOMMITTED on `feat/brand-page`** in the apex repo (same machine — the working tree
  persists). Do not switch branches or discard. If you want it safer, commit the branch (don't merge).
- The apex branch `feat/brand-page` also carries: the chonky wordmark (`.hbrand .wm` text-stroke) +
  Saira wiring. Separately, the ACADEMY repo has uncommitted work too (`feat/quiz-hexnode-redesign`
  quiz redesign; a `git stash` "chonky academy wordmark"). Those are NOT part of this task.

## Constraints (Josh)

- Don't merge without his go-ahead. He reviews every feature locally first.
- One pick per section before building it in. Confirm whether he wants the 9 sandboxes one-at-a-time.
