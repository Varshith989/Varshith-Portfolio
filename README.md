# Varshith Portfolio

Personal developer portfolio of **Varshith Reddy** — a frontend & software developer from Hyderabad, India.

## Live site

<https://portfolio-gvc2.onrender.com/>

## Built with

- HTML5
- CSS3 (no frameworks)
- Vanilla JavaScript (IntersectionObserver, rAF-throttled tilt/parallax, accessible accordion/menu)
- [DM Sans](https://fonts.google.com/specimen/DM+Sans) + [Space Mono](https://fonts.google.com/specimen/Space+Mono)

## Sections

- Hero — name, role, status, CTAs, tech chips
- About — background, focus areas, quick facts
- Experience — internships & job simulations
- Projects — 4 selected projects with live/GitHub links and key features
- Tech Stack — languages, frameworks, cloud & tools
- Education — B.Tech + schooling
- Connect — LinkedIn, GitHub, email, resume
- FAQ — focused on what recruiters ask
- Contact — call-to-action block

## Local development

```bash
# Serve the folder (any static server works:
python3 -m http.server 8000
# Or:
npx serve .
```

No build step, no dependencies, no trackers.

## Accessibility & performance

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`)
- Skip-to-content link
- `aria-expanded` / `aria-controls` on FAQ toggles and mobile menu
- `prefers-reduced-motion` support
- `:focus-visible` outlines
- rAF-throttled pointer handlers, passive listeners
- Zero page images loaded by default (the only `<img>` is the Power BI screenshot, 81 KB)

## SEO

- Title, meta description, canonical
- Open Graph + Twitter cards (uses live `og-image.jpg`)
- JSON-LD `Person` schema (GitHub/LinkedIn sameAs, education, skills)
- Semantic heading hierarchy
- `favicon.svg` VR monogram

## License

All content (resume, og-image) belongs to Varshith Reddy. Code available for reference.