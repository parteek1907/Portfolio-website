# 📜 Changelog

All notable changes to the **Parteek Garg Portfolio & Parteek OS** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] - 2026-10-28

### 🚀 The Parteek OS & Dual-Experience Architecture Update

#### Added
- **Multi-Domain Dual-Experience Architecture:**
  - Configured single Vercel deployment serving two tailored experiences based on incoming hostname:
    - `parteekgarg.in` & `www.parteekgarg.in`: Dark editorial showcase with 3D WebGL particle intro, Lenis smooth scrolling, and case study overlays.
    - `os.parteekgarg.in` (and `os.localhost:3000` in dev): Direct boot into **Parteek OS**, with subdomain preserved in the browser address bar (zero domain redirection).
  - Next.js Edge Middleware (`middleware.ts`) transparently detecting subdomain requests, preview queries (`?view=windows`, `?os=true`, `?subdomain=os`), and staging branches, rewriting to `/` with `x-experience: parteek-os` response headers.
  - Early-execution head script in `app/layout.tsx` injecting `windows-mode-active` class and setting page title before React hydration to eliminate any layout shift or theme flash.
  - Dynamic browser title management (`DynamicTitle.tsx`): automatically sets tab title to **`Parteek Garg | OS`** while in OS mode, and restores editorial titles when exiting or navigating back.

- **Full Windows 11 Desktop Simulation (`components/windows/`):**
  - **Window Management System:** Complete multi-window workspace with dynamic z-index layering, active window elevation, smooth dragging, window snapping, maximize/restore, minimize to taskbar, and `Alt+F4` keyboard shortcut support.
  - **Authentic Windows 11 Taskbar (`WindowsTaskbar.tsx`):** Centered Fluent taskbar with Start button, search, task view, running app indicator dots, hover previews, and system tray.
  - **Windows Start Menu (`WindowsStartMenu.tsx`):**
    - Acrylic Mica glassmorphism with search bar for real-time app filtering.
    - Curated Pinned Apps with authentic Fluent iconography: Terminal, File Explorer, Browser, Calculator, Notepad, Settings, Hackathons, Certifications, Contact, and About Me.
    - Curated Social Links in Recommended section: direct navigation to GitHub, LinkedIn, Twitter/X, and Email.
    - User account footer with avatar, name, and power options (Shut Down / Exit OS, Restart, Lock).
  - **Windows Quick Settings Action Center (`WindowsQuickSettings.tsx`):**
    - Toggle tiles for Wi-Fi, Bluetooth, Dark Mode, Focus Session, Airplane Mode, and Night Light.
    - Real-time interactive sliders for Display Brightness (controls desktop overlay lighting) and Audio Volume with sound feedback.
    - Network status, battery health indicators, and direct shortcut to Settings app.
  - **Live Calendar & Clock Flyout (`WindowsCalendar.tsx`):**
    - Isolated 1-second interval ticking digital clock displaying hours, minutes, seconds, and date.
    - Full monthly calendar grid with month traversal, "Go to today" jump, and selected date tracking.
    - Page visibility and window focus listeners to ensure the clock never freezes or falls behind.
  - **Desktop Customization & Context Menu (`WindowsDesktop.tsx`):**
    - Right-click context menu (View, Sort by, Refresh, Next Desktop Background, Display Settings, Personalize, Open in Terminal, About Parteek OS).
    - Multi-wallpaper support: Windows 11 Bloom Dark, Sunrise, Flow, Glow, and custom image URLs with `localStorage` persistence.
    - Realistic Windows 11 boot sequence (`WindowsBootScreen.tsx`) with animated loading ring.

- **Built-in Interactive Windows Applications:**
  - **Windows Command Prompt / Terminal (`components/windows/apps/TerminalApp.tsx`):**
    - Windows-style `C:\Users\ParteekOS>` prompt with MINGW64 environment banner.
    - Interactive command parser supporting `help`, `dir`, `ver`, `cls`/`clear`, `whoami`, `about`, `projects`, `skills`, `hackathons`, `certifications`, `resume`, `contact`, `socials`, `open <app>`, `date`, and `exit`.
    - Authentic Windows unknown command feedback and colorized output.
  - **Windows 11 Calculator (`components/windows/apps/CalculatorApp.tsx`):**
    - High-fidelity Windows 11 standard calculator with slate grey body (`#71767C`), cyan display (`#38BDF8`), and deep blue action key (`#005FB8`).
    - Standard arithmetic operations, floating-point decimals, backspace, clear entry (`CE`), all clear (`C`), negation (`±`), percentages, and physical numpad keyboard support.
  - **File Explorer (`components/windows/apps/ExplorerApp.tsx`):**
    - Breadcrumb path navigation (`This PC > Projects`, `Documents`, `Certifications`).
    - Grid and list view toggles, item details pane, and double-click to launch project case studies or PDF certificates.
  - **Notepad (`components/windows/apps/NotepadApp.tsx` & `AboutApp.tsx`):**
    - Text editor with file menu (New, Open, Save), live line/column count in status bar, and profile/engineering notes.
  - **Hackathon Track Record (`components/windows/apps/HackathonsApp.tsx`):**
    - Comprehensive hackathon directory with status filters (All vs. Wins 🏆), progression metrics (Top 150 → Top 50 → Top 5 → Winner), tech stack tags, and verified venue data.
  - **Certifications Browser (`components/windows/apps/CertificationsApp.tsx`):**
    - Categorized industry credentials from Cisco, Oracle, IBM, and more with verified credential IDs and modal preview integration.
  - **Interactive Resume App (`components/windows/apps/ResumeApp.tsx`):**
    - Formatted curriculum vitae with education at NMIMS Chandigarh, work history, hackathons, and direct PDF download.
  - **Mail & Contact App (`components/windows/apps/ContactApp.tsx`):**
    - Windows Mail-style client with active EmailJS integration, input validation, and direct social links.

- **Mobile Viewport Guardrails & Redesigned Notice (`DesktopRequiredModal.tsx`):**
  - Viewport-aware gatekeeper ($< 1024\text{px}$) intercepting mobile OS visits to protect user experience.
  - Redesigned with dark editorial aesthetic: restrained charcoal background, editorial serif headline (*"Best experienced on desktop"*), clean paragraph copy, minimal monochrome desktop icon, and single primary "Return to portfolio" button (with hostname-aware return navigation).

#### Changed
- Migrated Next.js deployment configuration from static export (`output: "export"`) to standard Next.js deployment on Vercel to support edge middleware while maintaining static prerendering (`○ Static`) for all routes.
- Updated Prayas Tech Hackathon venue from *UIET, Panjab University, Chandigarh* to **Plaksha University, Mohali** across timeline, hackathon app, and resume files.
- Redesigned Calculator icon (`public/icons/calculator.svg` & `WinFluentIcons.tsx`) to match Windows 11 standard geometry and color palette.
- Enhanced navbar with "Enter OS" trigger in editorial view, featuring animated transition into Windows Mode.

---

## [1.6.0] - 2026-10-15

### 🎨 The Editorial Architecture & Experience Polish Update

#### Added
- **Editorial Hero Section Redesign:** Re-architected hero into a clean, single-viewport editorial composition with serif headline typography (`"I build things that solve real problems."`), letter-spaced `PARTEEK GARG` eyebrow, and underline action links with diagonal arrow accents.
- **"Currently Building" Showcase Module:** Added an architectural right-aligned block displaying active technical pursuits (Full-stack systems, AI, FinTech) with custom hairline border and geometric node accents.
- **Living Scroll Micro-Animation:** Crafted a custom pulsating light-beam scroll indicator featuring an infinite laser pulse, breathing typography, and floating chevron for smooth section traversal.
- **Enhanced Project Team & Contributor System:** Overhauled contributor sections across all project case studies with automated GitHub avatar resolution (`https://github.com/USERNAME.png`), verified roles, clickable profiles, and React Portal rendering (`document.body`) to prevent stacking context bleed.
- **Hackathon Timeline Journey & Curation:** Integrated HackShift-IIITD and AI Ideathon into the Aceternity timeline, establishing strict reverse-chronological ordering and refined editorial subtitles.

#### Changed
- **Controlled Smooth Collapse Mechanics:** Eliminated layout plunge and jarring round-trip scroll jumps on "Show less" triggers in Projects and Hackathons by softly scrolling up to the target view before unmounting off-screen elements.

---

## [1.5.0] - 2026-09-20

### 🌊 The Smooth Experience Update

#### Added
- **Lenis Smooth Scrolling Integration:** Upgraded native scroll engine to Lenis, delivering a hardware-accelerated editorial scrolling experience.
- **Advanced Scroll Lock Architecture:** Hardened modal system by bridging Lenis with native body locks (`data-lenis-prevent`), ensuring the main page stays perfectly frozen when exploring Project, Certificate, Legal, and Lightbox overlays.
- **Mobile-First Rendering Rules:** Engineered a responsive `9:19` aspect ratio container system for project cards, allowing tall mobile app screenshots to scale perfectly alongside desktop landscape views without letterboxing.
- **Hackathon Timeline Integration:** Deployed a dedicated scroll-driven SVG timeline component to document the journey from early ideas (Prayas) to winning executions (Sanket).
- **High-Fidelity Assets:** Wired up comprehensive UI showcases, dashboards, and architecture diagrams for the FinWise and Ziro case studies.

---

## [1.4.0] - 2026-07-28

### 🪪 The Identity Update

#### Added
- **Premium Animated Signature:** Custom SVG footer signature with a smooth, CEO-style "ink drawing" wipe animation.
- **Dynamic Theme ID Card:** 3D physics ID card physically shifts materials between glossy black and bright white plastic based on active theme.
- **Advanced ID Card Styling:** Center-punched lanyard layout, premium serif typography, and official university logo integration.
- **Pixel-Perfect GitHub Activity:** Reconstructed heatmap matching native GitHub proportions exactly with a minimal horizontal hover pill.
- **Refined Document Titles:** Streamlined tab titles to a strict dual-state system (Active/Inactive), removing rotating timers.
- **Course Specialization:** Updated credentials to explicitly highlight Data Science specialization at NMIMS Chandigarh.

---

## [1.3.0] - 2026-07-10

### ✒️ The Editorial Overhaul

#### Added
- **Sliding Legal Modal:** All legal pages float up as an overlay instead of navigating away.
- **Editorial Tab Navigation:** Inside modal with Framer Motion `layoutId` underline glide.
- **Dynamic Browser Tab Titles:** Rotating messages when tab is inactive, restores on return.
- **Custom Smooth Scroll Engine:** Ease-out quint curve, replaces native browser scrolling.
- **Scroll Animation Cancellation:** User input instantly aborts programmatic scroll.
- **Unified 3px Hairline Scrollbar System:** Across the entire site.
- **Consistent Serif Typography System:** All headings use Georgia globally.
- **Footer Links Redesigned:** Animated underlines matching Hero CTA behavior.

---

## [1.2.0] - 2026-06-13

### 💎 The Polish Sprint

#### Added
- Layout-driven crossfade for project cards — resolved 0-height rendering flashes.
- Hero tagline updated to highlight AI and Data Science focus.
- Smooth Framer Motion crossfade without layout jumps on project transitions.
- Fixed navbar anchor scrolling and `layoutId` animation glitch.
- Bypassed Next.js router for smooth hash-based scrolling on hero page.
- Static editorial labels and Framer Motion contact buttons.
- Horizontal dividers between all major sections for visual rhythm.
- Certificate modal text clipping fixed with `flex-wrap`.
- Scroll margin offsets added to Projects, Skills, and About sections.

---

## [1.1.0] - 2026-06-11

### 🖼️ The Modal Architecture

#### Added
- Full project modal system — dynamic overlay modals replaced separate project pages.
- Auto-scrolling project screenshot gallery with lightbox zoom.
- Certification showcase with PDF-compatible lightbox using `react-pdf`.
- Native canvas rendering for flawless mobile PDF scaling.
- Dynamically loaded `react-pdf` to prevent `DOMMatrix` SSR failure during production builds.
- Synchronized close button exit animations across all modals.
- Resolved sticky scrolling block in ProjectModal and restored natural mobile layout order.
- Fixed footer element overlap on mobile viewports.
- Hero layout refined — emojis replaced with Lucide icons.
- Comprehensive project screenshots, issuer logos, and certification PDFs added.

---

## [1.0.0] - 2026-05-22

### 🔍 The SEO & Accessibility Pass

#### Added
- Comprehensive SEO optimizations — meta descriptions, Open Graph tags, structured data.
- Custom favicon and OG image generated.
- Mobile UI refinements across all sections.
- Certifications added to navbar navigation.

---

## [0.9.0] - 2026-04-23

### 🎨 The Design System

#### Added
- Switched display font to Georgia serif — established the editorial identity.
- Dark/light theme toggle with smooth transitions via `Providers` architecture.
- Copy-to-clipboard email button with Framer Motion transition feedback.
- Certifications section built with aligned card layout.
- Global CSS variables and animation system established.
- Hero, Navbar, SocialPill, About, Skills, and Projects components all refined.
- Custom 404 page designed.

---

## [0.5.0] - 2026-03-18

### ⚙️ The Infrastructure

#### Added
- MIT License added.
- Netlify deployment configured — cache headers, `_redirects`, static export.
- Scroll restoration fix — browser scroll restore prevented, forced top on page load.
- Project detail pages removed in favor of modal-first approach.
- Hero animation skip on back-navigation implemented.

---

## [0.1.0] - 2026-03-12

### 💥 The Big Bang

#### Added
- Major portfolio overhaul — complete redesign from scratch.
- Comprehensive README with architecture diagrams and animation pipeline docs.
- Core sections built: Hero, About, Projects, Skills, Contact.
- Framer Motion animation system integrated.
- Next.js 16 with Turbopack as the foundation.

---

## [0.0.1] - 2026-03-01

### 🏁 Initial Commit

- Repository initialized.
- Project scaffolded with Next.js, React, and Tailwind CSS.
