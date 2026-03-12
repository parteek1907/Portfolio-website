<div align="center">

# Parteek Garg — Portfolio

A modern, animated developer portfolio built with **Next.js 16**, **Three.js**, **Framer Motion**, and **Tailwind CSS 4**.

[**Live Site →**](https://parteekgarg.me)

</div>

---

## Preview

> Dark-themed, single-page portfolio featuring a cinematic 3D particle intro, staggered scroll animations, a custom neural-node cursor, and individual project detail pages.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router, Static Export) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 4 |
| **3D / Particles** | Three.js, React Three Fiber, Drei |
| **Animations** | Framer Motion |
| **Icons** | Lucide React, Devicon, React Icons |
| **Contact** | EmailJS (client-side) |
| **Deployment** | Netlify (static) |

---

## Features

- **Cinematic 3D Hero** — Three.js particle system with a 4-phase intro animation (fly-in → sphere formation → hold → network dissolve)
- **Custom Neural-Node Cursor** — White dot with purple glow, trailing outer ring, radiating lines, and hover/visibility states (disabled on touch devices)
- **Scroll Progress Bar** — Thin purple gradient bar at the top of the viewport tracking page scroll
- **Typewriter Badge** — Cycling text animation in the hero section
- **Project Detail Pages** — `/projects/[slug]` routes with full descriptions, learnings, and tech stacks (statically generated)
- **Staggered Scroll Animations** — Section headings, cards, and footer fade-up on viewport entry
- **Lazy-Loaded Sections** — Below-fold components loaded via `next/dynamic` for smaller initial bundle
- **Contact Form** — EmailJS integration with email format validation and status feedback
- **Social Pill** — Floating bottom bar with GitHub, LinkedIn, X, Instagram, and LeetCode links
- **Responsive** — Mobile-optimized particle count, navigation, and layout
- **SEO** — Open Graph & Twitter Card metadata, `robots.ts`, `sitemap.ts`

---

## Project Structure

```
app/
├── layout.tsx              # Root layout (providers, global components)
├── page.tsx                # Home — lazy-loads all sections
├── globals.css             # Global styles, custom scrollbar, keyframes
├── not-found.tsx           # Custom 404 with terminal aesthetic
├── robots.ts               # SEO robots
├── sitemap.ts              # SEO sitemap
└── projects/[slug]/
    └── page.tsx            # Dynamic project detail pages

components/
├── Hero.tsx                # Hero section + TypewriterBadge
├── About.tsx               # About section with insight cards
├── Skills.tsx              # Skills grid (langs, frontend, domains)
├── Projects.tsx            # Featured projects grid (data-driven)
├── ProjectCard.tsx         # Individual project card
├── ProjectDetail.tsx       # Full project detail page
├── Contact.tsx             # Contact form (EmailJS)
├── Footer.tsx              # Footer with branding
├── Navbar.tsx              # Responsive navbar with scroll spy
├── CinematicNeuralBackground.tsx  # Three.js particle animation
├── CursorEffect.tsx        # Custom cursor (neural node style)
├── ScrollProgressBar.tsx   # Scroll progress indicator
├── SocialPill.tsx          # Floating social links bar
├── BackToTop.tsx           # Scroll-to-top button
├── ScrollLock.tsx          # Locks scroll during intro
└── LoadingContext.tsx      # Loading state provider

lib/
└── data.ts                 # Centralized portfolio data
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Install & Run

```bash
# Clone
git clone https://github.com/parteek1907/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view in browser.

### Build

```bash
npm run build
```

Outputs a static export to the `out/` directory.

---

## Deployment

Configured for **Netlify** via `netlify.toml`. Push to the connected branch and Netlify handles the rest.

To deploy elsewhere (Vercel, Cloudflare Pages, etc.), use the static export output in `out/`.

---

## License

This project is provided for personal portfolio use. Feel free to reference the code for learning, but please don't copy the design or content directly.

---

<div align="center">
  <sub>Built by <a href="https://github.com/parteek1907">Parteek Garg</a></sub>
</div>
