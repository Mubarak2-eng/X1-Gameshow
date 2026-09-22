# X1 Quizshow — Premium Landing Page

> Das neue Live-Event im Kino

## 🔗 Live Prototype

**[→ View Figma-style Prototype](https://mubarak2-eng.github.io/X1-Gameshow/prototype.html)**

**[→ View Landing Page Directly](https://mubarak2-eng.github.io/X1-Gameshow/)**

---

## About

X1 is the world's first cinema quiz show where the entire audience plays simultaneously from their seats using the X1 app on their smartphones.

This repository contains a **fully interactive, premium landing page** built as a design proposal — demonstrating animation, scroll storytelling, responsive design, and a custom video player.

## Tech Stack

- Pure HTML5 / CSS3 / Vanilla JS (zero dependencies)
- Google Fonts — Inter Variable
- IntersectionObserver API for scroll reveals
- Custom video player with full controls
- Responsive: Desktop → Tablet → Mobile

## Design System

| Token | Value |
|---|---|
| Background | `#080a0f` |
| Accent | `#00a8ff` |
| Typography | Inter 900 at clamp(3.8rem, 9vw, 7.5rem) |
| Easing | `cubic-bezier(0.19, 1, 0.22, 1)` |
| Section spacing | `9rem` |

## Pages

| File | Description |
|---|---|
| `index.html` | Main landing page (8 sections) |
| `prototype.html` | Figma-style clickable prototype viewer |
| `styles.css` | Full design system |
| `main.js` | All interactions and animations |

> **Note:** Video assets are not committed to this repo due to GitHub's 100MB file size limit.
> Host videos on Vimeo/Cloudinary/S3 and update the `src` attributes in `index.html`.

## Sections

1. Hero — Cinematic video background, staggered text entrance, parallax
2. Value Proposition — Editorial two-column layout
3. How It Works — Alternating 3-step story
4. Trailer — Custom video player with full controls
5. Storytelling — Cinematic quote + phone mockup
6. Social Proof — Animated counting statistics
7. CTA — Video-backed final call-to-action
8. Footer — Impressum · AGB · Widerrufsrecht · Über Uns · Datenschutz

## Interactions

- Sticky frosted-glass navigation with active section tracking
- Scroll-triggered reveals (IntersectionObserver, expo ease-out, 1.2s)
- Hero video parallax at 0.35× scroll speed
- Custom video player (play/pause/scrub/mute/fullscreen)
- Animated counting statistics
- Cursor glow effect (desktop only)
- Button ripple feedback
- Mobile burger menu with animated X transition
