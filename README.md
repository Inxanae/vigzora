# VIGZORA — Luxury Photography Studio & Custom Frames

A production-ready, fully static one-page website for VIGZORA. Built with plain
HTML/CSS/JS (no build step, no framework) so it can be dropped onto **any**
static host — GitHub Pages, Netlify, Vercel, Cloudflare Pages, or a plain
shared-hosting `public_html` folder.

## Files

```
vigzora/
├── index.html      → all markup, SEO meta, OpenGraph/Twitter tags, LocalBusiness schema
├── styles.css       → full design system (tokens, layout, motion, responsive)
├── script.js        → loader, nav, reveal-on-scroll, tabs, filters, lightbox, counters, carousel
├── assets/
│   └── logo.png     → your VIGZORA logo (used as favicon, nav mark, hero mark, footer, loader)
└── README.md
```

## Running it locally

No install needed. Either:

- Double-click `index.html`, or
- From this folder run a tiny local server (recommended, avoids browser file:// quirks):

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Content status

- **Portfolio photos**: `assets/gallery/` now holds 10 real photos, two per
  category — `photography-01/02.jpg`, `frames-01/02.jpg`,
  `wedding-01/02.jpg`, `portrait-01/02.jpg`, `events-01/02.jpg`. They're wired
  into the `folioData` array in `script.js` (title, category and filename per
  item) and render as real `<img>` tiles with hover zoom + lightbox — replace
  any file in `assets/gallery/` with a same-named file to swap a photo, or add
  a new entry to `folioData` (plus a matching image) to add more tiles.
- **About section image**: `assets/gallery/photography-01.jpg` is also used as
  the framed portrait next to the "Our Story" copy.
- **Instagram grid**: still placeholder icons in the `#instagram` section of
  `index.html` — swap each `.insta-item`'s placeholder icon for an `<img>`
  once you have posts to feature.
- **Hero background**: `.hero-bg` is still a styled gradient. Add a background
  image or `<img>` once you have a hero photo you want featured full-bleed.
- **Google Map**: the embed URL in the Contact section currently geocodes the
  studio's town (Vembarpatty, Dindigul). Once you have an exact Google Maps
  pin, replace the `src` of the `<iframe>` with the "Embed a map" link from
  Google Maps for a precise marker.

## Editing content

Everything is plain HTML — open `index.html` in any editor and change text
directly. Section order top to bottom: Hero → About → Services (tabs:
Photography/Cinematics vs Custom Frames/Prints) → Why Vigzora → Portfolio →
Experience stats → Testimonials → Instagram → Contact → Footer.

## Design tokens

All colours, fonts, spacing and easing live at the top of `styles.css` under
`:root`. Change a value once there and it updates everywhere:

- `--bg` / `--bg-2` — near-black backgrounds
- `--gold` / `--gold-2` — gold accent + gradient
- `--f-display` (Playfair Display), `--f-body` (Manrope), `--f-accent` (Space
  Grotesk), `--f-ui` (DM Sans)

## Deployment

**Netlify / Vercel / Cloudflare Pages**: drag-and-drop the whole `vigzora/`
folder in their dashboard, or connect a Git repo — no build command needed
(this is a static site, not a Next.js app), just set the publish directory to
the repo root.

**GitHub Pages**: push this folder to a repo, then in Settings → Pages, choose
the branch and `/ (root)` folder.

**Any shared hosting**: upload the four files/folder as-is via FTP into
`public_html`.

## Notes on scope

This build ships as hand-written static HTML/CSS/JS rather than a Next.js app,
so it has zero dependencies, zero build step, and works identically on every
static host with no server. All animations (loader, text reveal, scroll
reveals, magnetic buttons, cursor glow, counters, carousel, lightbox) are
implemented in vanilla JS in `script.js`. `prefers-reduced-motion` is
respected throughout. If you'd like this rebuilt as a Next.js/TypeScript/
Framer Motion/GSAP app instead (e.g. to add a CMS or booking backend later),
that's a bigger follow-up build — happy to do it as a next step.
