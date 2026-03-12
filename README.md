# 🌐 Parteek Garg — Developer Portfolio

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.182.0-000000?style=flat-square&logo=three.js&logoColor=white)](https://threejs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.34.3-FF0050?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![EmailJS](https://img.shields.io/badge/EmailJS-4.4.1-FFA500?style=flat-square)](https://www.emailjs.com/)
[![Netlify](https://img.shields.io/badge/Netlify-Deployed-00C7B7?style=flat-square&logo=netlify&logoColor=white)](https://www.netlify.com/)

**A modern, animated developer portfolio featuring a cinematic 3D particle intro, custom neural-node cursor, scroll-triggered animations, and individual project detail pages — all statically exported with Next.js 16.**

[How It Works](#-how-it-works) · [Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [Deployment](#-deployment)

</div>

---

## 📌 Project Overview

This portfolio is a single-page application with dedicated project detail routes, built around three engineering principles: **visual storytelling** (a cinematic 3D particle intro that transitions from sphere formation to neural network), **performance-aware animation** (Three.js with mobile-optimized particle counts, `useRef`-driven cursor tracking with zero React re-renders, and lazy-loaded below-fold sections), and **static-first architecture** (full `next export` output — no server required, deployable to any CDN).

The site consists of 7 main sections (Hero, About, Skills, Projects, Contact, Footer, 404) plus dynamically generated `/projects/[slug]` detail pages, all orchestrated through a loading context that coordinates the intro animation sequence before revealing content.

---

## 🧠 How It Works

### Page Load — Cinematic Intro Sequence

```
Browser loads → LoadingContext: isLoading = true
        │
        ▼
 Phase 0   Scroll locked, navbar hidden, content invisible
           Three.js canvas initializes (WebGL)
        │
        ▼
 Phase 1   SPHERE FORMATION (0–2s)
           450 particles (280 on mobile) fly in from random
           positions and lerp to Fibonacci sphere targets
           Lerp factor: 0.03 → positions converge on sphere
        │
        ▼
 Phase 2   SPHERE HOLD (2–4s)
           Sphere rotates gently (Y += delta × 0.2)
           Particles settle with lerp factor 0.1
           X-axis wobble: ±0.1 (±0.05 on mobile)
        │
        ▼
 Phase 3   DISSOLVE TO NETWORK (4–6.5s)
           Particles scatter outward to 3D network formation
           Individual stagger: random 0–500ms per particle
           Easing: ease-out cubic (fast start, slow finish)
           Connection threshold interpolates from sphere to network
        │
        ▼
 Phase 4   onLoadComplete() fires → isLoading = false
           Scroll unlocked, navbar fades in
           Hero content animates in (character-by-character stagger)
           TypewriterBadge begins cycling phrases
        │
        ▼
 Phase 5   NETWORK LOOP (∞)
           Particles drift infinitely with velocity
           Wrapping bounds: ±30 units
           Rotation: Y += delta × 0.01
           Lines connect nearby particles (distance threshold)
```

### Fibonacci Sphere Algorithm (Particle Positioning)

```
Golden angle: φ = π(3 - √5)

For particle i of N total:
    y = 1 - (i / N) × 2
    radius = √(1 - y²)
    θ = φ × i

    position = (
        cos(θ) × radius × sphereRadius,
        y × sphereRadius,
        sin(θ) × radius × sphereRadius
    )
```

This produces an even distribution of points on a sphere surface, avoiding the polar clustering that occurs with latitude/longitude grids.

### Network Scatter (3D Uniform Distribution)

```
θ = 2π × u
φ = arccos(2v - 1)
r = scatterRadius × ∛(w)

position = spherical_to_cartesian(r, θ, φ)

Desktop scatterRadius: 35
Mobile scatterRadius: 20
```

### Custom Cursor — Neural Node Tracking

```
Mouse moves → window mousemove event
        │
        ├─→ Inner node: SNAP (no lerp)
        │   position set directly via ref.style.transform
        │   White dot (#fff) with purple glow
        │
        ├─→ Radiating lines: SNAP (same position)
        │   4 lines at 0°, 90°, 180°, 270°
        │   Pulse animation: 5px↔8px width, 0.3↔0.8 opacity
        │   Staggered 0.5s per line
        │
        └─→ Outer ring: LERP (factor 0.10)
            requestAnimationFrame loop
            Trails behind inner node by ~2-3 frames
            Purple border (#8b5cf6/0.6)

Hover detection:
    Selector: a, button, [role="button"], input, textarea, select
    MutationObserver watches for dynamically added elements
    On hover → colors shift to white, glow intensifies
    Transitions: 0.15s ease (unified across all parts)

Visibility:
    document.mouseleave → opacity 0
    document.mouseenter → opacity 1
    Touch devices → return null (matchMedia pointer: coarse)
```

---

## ✨ Features

**Cinematic 3D Particle Intro** — A Three.js scene with 450 particles (280 on mobile) that animate through 4 phases: fly-in → Fibonacci sphere formation → gentle rotation hold → staggered dissolve to an infinite neural network. Uses additive blending, connection lines between nearby particles, and fog depth (desktop only).

**Custom Neural-Node Cursor** — A white inner dot with purple glow, trailing outer ring with lerp-based smooth following, and 4 radiating lines with staggered pulse animations. Hover detection via MutationObserver catches dynamically rendered interactive elements. Disabled on touch devices. All position updates via `useRef` — zero React re-renders on mouse move.

**Scroll Progress Bar** — A 2px purple gradient bar (`#7c3aed → #8b5cf6 → #a78bfa`) at the very top of the viewport with a glowing box-shadow, tracking scroll position via `requestAnimationFrame`. Width updates directly via ref.

**Typewriter Badge** — Cycles through 4 phrases with character-level add (60ms) and delete (35ms) animation, 1800ms hold between phrases, and a blinking cursor at 500ms intervals.

**Character-by-Character Hero Animation** — "Building Practical Systems." animates in with Framer Motion stagger, where "Practical" uses a `from-purple-400 to-purple-600` gradient.

**Project Detail Pages** — `/projects/[slug]` routes statically generated via `generateStaticParams()` with per-page metadata. Each page shows the full project description, "What I Learned" card, tech stack tags, stat chips, and a GitHub CTA — all with staggered fade-up animations.

**Lazy-Loaded Sections** — About, Skills, Projects, Contact, and Footer are loaded via `next/dynamic`, code-splitting their JavaScript bundles so only Hero and Navbar load immediately.

**Staggered Scroll Animations** — Section headings, skill cards (delay: `index × 0.1`), project cards (delay: `index × 0.15`), and the footer all animate on viewport entry via Framer Motion's `whileInView`.

**Contact Form with Validation** — EmailJS integration with regex email validation (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`), status feedback (idle → sending → success/error), and auto-reset after 5 seconds.

**Social Pill** — Fixed bottom-center floating bar with GitHub, LinkedIn, X, Instagram, and LeetCode links. Appears after 100px scroll with a frosted glass effect (`bg-black/40 backdrop-blur-3xl`). Tooltips on hover.

**Active Section Navbar** — IntersectionObserver with `-50% 0px -50% 0px` root margin detects the active section. Adds glass-morphism backdrop blur and border on scroll.

**Custom 404 Page** — Terminal-aesthetic design with mock bash commands (staggered line animations), glitch-animated "404" text, and the CinematicNeuralBackground running in `skipIntro` mode.

**SEO** — Open Graph & Twitter Card metadata, `robots.ts`, `sitemap.ts` with 4 routes, and per-project meta tags on detail pages.

**Responsive Design** — Mobile-optimized particle count (280 vs 450), reduced connection distances, simplified 3D rendering (antialiasing off, single DPR, fog disabled), responsive grid breakpoints across all sections.

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|:-------:|
| **Framework** | Next.js (App Router, Static Export) | 16.1.6 |
| **Language** | TypeScript | 5 |
| **UI Library** | React | 19.2.3 |
| **Styling** | Tailwind CSS | 4 |
| **3D Rendering** | Three.js | 0.182.0 |
| **3D React Bindings** | React Three Fiber | 9.5.0 |
| **3D Helpers** | Drei | 10.7.7 |
| **Animations** | Framer Motion | 12.34.3 |
| **Icons** | Lucide React | 0.563.0 |
| **Icons (Extended)** | React Icons | 5.6.0 |
| **Skill Icons** | Devicon | CDN |
| **Email Service** | EmailJS Browser SDK | 4.4.1 |
| **Class Utilities** | clsx + tailwind-merge | 2.1.1 / 3.4.0 |
| **Linting** | ESLint | 9 |
| **Deployment** | Netlify (Static) | — |

---

## 📁 Project Structure

```
app/
├── layout.tsx                 # Root layout — providers, cursor, progress bar
├── page.tsx                   # Home — lazy-loads all below-fold sections
├── globals.css                # Global styles, scrollbar, keyframes, cursor:none
├── icon.tsx                   # Dynamic favicon (purple "PG" initials)
├── not-found.tsx              # Custom 404 with terminal aesthetic
├── robots.ts                  # SEO robots configuration
├── sitemap.ts                 # SEO sitemap (4 routes)
└── projects/[slug]/
    └── page.tsx               # Static project detail pages (generateStaticParams)

components/
├── CinematicNeuralBackground.tsx  # Three.js 450-particle 4-phase animation
├── NeuralBackground.tsx           # 2D Canvas fallback (180 particles)
├── CursorEffect.tsx               # Custom neural-node cursor (3 layers)
├── ScrollProgressBar.tsx          # 2px purple gradient scroll indicator
├── Hero.tsx                       # Hero section + TypewriterBadge sub-component
├── About.tsx                      # About section with insight cards
├── Skills.tsx                     # Skills grid (3 categories, animated cards)
├── Projects.tsx                   # Featured projects (data-driven from lib/data)
├── ProjectCard.tsx                # Individual project card with hover effects
├── ProjectDetail.tsx              # Full project detail page component
├── Contact.tsx                    # Contact form (EmailJS + validation)
├── Footer.tsx                     # Footer with branding
├── Navbar.tsx                     # Responsive navbar with scroll spy
├── SocialPill.tsx                 # Floating social links bar (5 platforms)
├── BackToTop.tsx                  # Scroll-to-top button (desktop only)
├── ScrollLock.tsx                 # Locks scroll during intro animation
└── LoadingContext.tsx             # Loading state provider (coordinates intro)

lib/
└── data.ts                        # Centralized portfolio data (projects, skills, links)

public/
├── ParteekGarg_Resume.pdf         # Downloadable resume
└── og-image.png                   # Open Graph social preview image
```

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| **Primary** | `#8b5cf6` | Accent color, cursor glow, active states |
| **Primary Dark** | `#7c3aed` | Gradient start, progress bar |
| **Primary Light** | `#a78bfa` | Gradient end, hover states |
| **Background** | `#000000` | Page background, cards |
| **Surface** | `#18181b` (zinc-900) | Card backgrounds, inputs |
| **Border** | `rgba(255,255,255,0.05)` | Section borders, card edges |
| **Text Primary** | `#ffffff` | Headings, body |
| **Text Secondary** | `#a1a1aa` (zinc-400) | Descriptions, labels |
| **Success** | `#22c55e` | Status badge, form success |
| **Error** | `#ef4444` | Form error state |
| **Font** | Inter (Google Fonts) | All typography |

---

## 🎭 Animation Inventory

| Animation | Trigger | Duration | Details |
|-----------|---------|:--------:|---------|
| **Particle Intro** | Page load | ~6.5s | 4-phase Three.js sequence (sphere → network) |
| **Hero Content** | Intro complete | 0.8s | Fade-up with 0.2s delay per element |
| **Character Stagger** | Intro complete | ~1.5s | Letter-by-letter with 0.03s stagger |
| **Typewriter** | Intro complete | ∞ | 60ms type / 35ms delete / 1.8s hold |
| **Section Fade-Up** | Scroll into view | 0.5s | `whileInView` with `once: true` |
| **Skill Cards** | Scroll into view | 0.3s | Stagger: `index × 0.1s` |
| **Project Cards** | Scroll into view | 0.5s | Stagger: `index × 0.15s` |
| **Cursor Pulse** | Always | 2s | Lines: 5↔8px width, 0.3↔0.8 opacity |
| **Social Pill** | 100px scroll | 1s | Custom easing `[0.16, 1, 0.3, 1]` |
| **Glitch Text** | 404 page | 5s | ±3px displacement, cyan/amber shadows |
| **Status Badge** | Intro complete | 1.5s | Green dot scale 1→1.5→1 infinite |
| **Progress Bar** | Scroll | rAF | Width 0%→100% via `useRef` |

---

## ⚡ Performance Optimizations

| Optimization | Implementation |
|-------------|---------------|
| **Lazy Loading** | Below-fold sections via `next/dynamic` |
| **Zero Re-render Cursor** | All position updates via `useRef` + `style.transform` |
| **Zero Re-render Progress** | Scroll width via `useRef` + `requestAnimationFrame` |
| **Mobile Particle Reduction** | 450 → 280 particles, connection limit 5 |
| **Mobile 3D Simplification** | Antialiasing off, 1 DPR, fog disabled, smaller sphere |
| **Passive Scroll Listeners** | `{ passive: true }` on scroll events |
| **Static Export** | `output: "export"` — no server, pure CDN delivery |
| **Code Splitting** | 5 dynamic imports for below-fold components |
| **rAF Batching** | Cursor lerp + scroll progress in animation frames |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm / yarn / pnpm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/parteek1907/Portfolio-website.git
cd Portfolio-website

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view in browser.

### Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Start Next.js dev server |
| `dev:mobile` | `npm run dev:mobile` | Dev server on `0.0.0.0` (LAN accessible) |
| `build` | `npm run build` | Static export to `out/` directory |
| `start` | `npm run start` | Serve production build locally |
| `lint` | `npm run lint` | Run ESLint |

### Production Build

```bash
npm run build
```

Generates a fully static site in the `out/` directory — deployable to any static hosting provider.

---

## 🌐 Deployment

Pre-configured for **Netlify** via `netlify.toml`:

1. Push repository to GitHub.
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site → Import from Git**.
3. Build settings are auto-detected:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Plugin:** `@netlify/plugin-nextjs`
4. Click **Deploy site**.

For other providers (Vercel, Cloudflare Pages, GitHub Pages), use the static `out/` directory from `npm run build`.

---

## 📱 Responsive Breakpoints

| Breakpoint | Particles | Sphere Radius | Scatter Radius | Connections | DPR | Antialiasing | Fog |
|:----------:|:---------:|:-------------:|:--------------:|:-----------:|:---:|:------------:|:---:|
| **Desktop** (≥768px) | 450 | 3.5 | 35 | Unlimited | 1–2 | ✅ | ✅ |
| **Mobile** (<768px) | 280 | 2.3 | 20 | Max 5 | 1 | ❌ | ❌ |

---

## 👤 Author

**Parteek Garg**

## 📄 License

This project is provided for personal portfolio use. Feel free to reference the code for learning, but please don't copy the design or content directly.

---

<div align="center">

Built with Next.js, Three.js, and attention to detail.

⭐ Star this repo if you found it useful!

</div>
