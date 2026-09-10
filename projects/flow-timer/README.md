# FLOW - Ambient Focus Timer

A single-file ambient focus timer built with **vanilla HTML, CSS, and JavaScript** - no frameworks, no build tools, no dependencies.

## Features

- **25 / 5 / 15 min presets** plus a custom minute picker
- **Ambient ember canvas** - generative floating particles respond to the session
- **SVG progress ring** with animated glow
- **Session journaling** - completed focus minutes are saved to `localStorage`
- **Weekly focus bars** - the last 7 days plotted as mini bar chart, today highlighted
- **WebAudio chime** on completion (no extra files)
- **Accessible** - ARIA live status announcements, keyboard control (Space)., focus-visible styles
- **Responsive + reduced-motion aware** - fluid layout down to small phones; respects `prefers-reduced-motion`
- **Pause/resume** by wall-clock (safe across accidental refreshes mid-run via `endAt` math)

## Try it

Open `index.html` in any modern browser.0 dependencies, works offline.2

Or visit the live copy from your portfolio's projects list.

## Structure

`index.html` - markup + semantic sections
`style.css` - design system (type, color, layout, motion,
`script.js` - timer logic, ember canvas, stats, audio

## Why

Shows comfortable with: DOM APIs, canvas rendering, SVG, WebAudio.rsquo; WebStorage, CSS custom properties, CSS animations, responsive design, ARIA,a11y best practices - all dependency-free.