# Osnel Hosea — Portfolio

A single-page portfolio built with React + Vite + Tailwind CSS v4. Static
site, no backend, no database — everything you'd want to change lives in
one plain content file.

## Run it locally

```bash
npm install
npm run dev       # local dev server with hot reload
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Run it with Docker

```bash
docker compose up --build -d
```

Open **http://localhost:1997**. That's it — one container, nginx serving
the static build, nothing else to configure or run. The port is fixed in
`docker-compose.yml`, so you don't need to remember a `-p` flag each time.

To stop it: `docker compose down`.

## Update your content

Everything you'd want to change — name, bio, skills, projects, experience,
testimonials, social links, contact info — lives in one file:

```
src/data/siteData.js
```

Edit the values there, rebuild (`npm run build` or `docker build` again),
and redeploy. No component code needs to change. Sections that receive an
empty list (testimonials, social links) automatically hide until you add
entries.

## Add your profile photo

Drop this file into `public/assets/`:
- `profile.jpg` — shown in the hero section; falls back to a circle with
  your initials if missing

## Project structure

```
src/
  data/
    siteData.js          <- all editable content lives here
  lib/
    gsap.js          <- registers the ScrollTrigger plugin once, shared everywhere
    resolveAssetPath.js
  components/
    common/
      Reveal.jsx, Magnetic.jsx, SpotlightCard.jsx  <- shared interaction helpers
    layout/
      Header.jsx, Footer.jsx, Section.jsx
    Hero/            name, title, tagline, photo, CTAs
    About/           bio paragraphs + stat cards
    Skills/          categorized skill tags
    Work/            project cards (description, highlights, tech stack)
    Experience/      timeline of roles
    Testimonials/    quote cards (hidden automatically if empty)
    Contact/         email/WhatsApp cards
    SocialLinks/     icon row (LinkedIn, GitHub, etc.), used in Hero/Footer
  App.jsx            composes all sections
  main.jsx           React entry point
  index.css          Tailwind import + theme colors + interaction styles
```

Each section is a self-contained folder: the section component reads from
`siteData.js` and renders a list of small presentational sub-components
(cards, timeline items, etc). This keeps every part of the page independently
readable and easy to extend — e.g. to add a new project, just add an entry to
the `projects` array in `siteData.js`.

## Styling

Colors are defined once as CSS custom properties in `src/index.css` via
Tailwind's `@theme` block, then used as normal utility classes everywhere
(`bg-card`, `text-accent`, `border-border`, etc.). Change a color in one place
and it updates across the whole site.

## Motion

Scroll-triggered animation runs on [GSAP](https://gsap.com) + ScrollTrigger
(`src/lib/gsap.js` registers the plugin once). `Reveal.jsx` scrubs each
section's entrance directly to scroll position — scroll down and it plays,
scroll back up and it reverses — rather than a fixed-duration animation that
just triggers once. The Hero runs a one-time GSAP timeline on load (a
staggered, masked title reveal) and a separate scroll-scrubbed exit as it
scrolls out of view. Card tilt/hover effects (`SpotlightCard.jsx`,
`Magnetic.jsx`) stay plain CSS transforms — no GSAP needed there. Everything
motion-related checks `prefers-reduced-motion` (via `gsap.matchMedia()` for
the GSAP-driven pieces, `window.matchMedia()` inline for the rest) and skips
straight to the final state for anyone who's asked for reduced motion.

## Deploying

`npm run build` outputs a static `dist/` folder that can be hosted anywhere
(the included Dockerfile, Digital Ocean, Netlify, Vercel, S3, GitHub Pages,
etc.) — no server required.

### Deploying to GitHub Pages (free)

This repo already includes a GitHub Actions workflow
(`.github/workflows/deploy.yml`) that builds and publishes the site
automatically. One-time setup:

1. Create a GitHub repo named `osnel-portfolio` (the workflow assumes this
   exact name — it's what makes the site's asset paths resolve correctly
   under `github.io/osnel-portfolio/`).
2. Push this project to it:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/osnel-portfolio.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source → GitHub Actions**. (One-time —
   you don't need to pick a branch/folder, the workflow handles it.)
4. Push to `main` (step 2 already did this) and check the **Actions** tab —
   the "Deploy to GitHub Pages" workflow runs automatically. When it
   finishes, your site is live at:
   ```
   https://<your-username>.github.io/osnel-portfolio/
   ```

From then on, every push to `main` redeploys automatically — no manual
build step, no server, no cost.

If you ever rename the repo, update the `base` path in `vite.config.js`
to match (`/<new-repo-name>/`).

## Security

See [`SECURITY.md`](./SECURITY.md) for a category-by-category OWASP
Top 10:2025 assessment of this site, what's been hardened (CSP,
dependency supply chain, least-privilege CI permissions), and what's
a platform limitation of static GitHub Pages hosting rather than
something fixable here.
