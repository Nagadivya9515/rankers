# RankersPro Website — Frontend

Static, mobile-first marketing site for **rankerspro.com**, built with Next.js
(App Router) and Tailwind CSS. Fully static-export ready (`output: "export"`
in `next.config.js`) — no server runtime required at deploy time; the only
dynamic feature (the Notify Me lead form, see the SRS) is out of scope for
this build and would be added as a separate serverless function later.

## Stack

- **Next.js 14** (App Router, static export)
- **TypeScript** (strict mode)
- **Tailwind CSS** — brand tokens (`brand` = deep green, `gold` = amber) in
  `tailwind.config.ts`

## Structure

```
app/
  layout.tsx              Root layout — fonts, header, footer, base metadata
  page.tsx                Home
  about/page.tsx           About Us
  faculty/page.tsx         Our Faculty
  achievers/page.tsx       Achievers & Results
  batches/page.tsx         Batches listing (category filter)
  batches/[slug]/page.tsx  Batch detail (generateStaticParams — one page per batch)
  resources/page.tsx       Free Resources + Mentorship Plan
  legal/terms/page.tsx
  legal/privacy/page.tsx
  legal/refund/page.tsx
  sitemap.ts, robots.ts    SEO
  icon.tsx                 Generated favicon (no external asset)
components/                Header, Footer, cards, placeholder media, etc.
data/                      faculty.json, batches.json, toppers.json, resources.json
lib/                       types.ts (shared types), data.ts (typed accessors),
                           format.ts (currency helpers), fonts.ts
```

## Content is 100% data-driven

Every faculty member, batch, topper, and resource lives in `data/*.json`,
typed against `lib/types.ts`. To add or edit content, edit the JSON — no
component code changes needed. The dynamic batch detail page
(`app/batches/[slug]/page.tsx`) pre-renders one static HTML page per batch
at build time via `generateStaticParams()`.

## Image assets

**No photos exist yet.** Every place a photo would normally go (faculty
portraits, topper photos, batch card art, video thumbnails) uses a Tailwind
placeholder shape instead — see `components/PlaceholderMedia.tsx`:

- `InitialsAvatar` — a colored circle with a person's initials, for faculty
  and topper portraits.
- `PlaceholderCardArt` — a brand-gradient rectangle with an icon + label,
  for batch/course card art.
- `PlaceholderVideoBox` — a dark "player" box with a play icon, for the
  Free Resources video grid.

Every placeholder is rendered with `role="img"` and a full, descriptive
`alt`-equivalent `aria-label` (e.g. *"Placeholder portrait avatar for KP Sir
(Krishna Prakash), RankersPro Civil and Environmental Engineering faculty,
shown as deep green circle with initials KP"*) so search engines and screen
readers get real semantic grounding even before real photography is
dropped in. **When real photos are ready, swap these components for
`next/image` (remote images will need `images.unoptimized` handling or a
loader, since this project uses static export) — the `alt` strings already
written into `data/*.json` (`photoAlt` / `imageAlt` fields) can be reused
directly.**

## Brand

- Primary — Deep Green `#0B4D3A` (`brand-500` in Tailwind)
- Accent — Gold/Amber `#C79A3E` (`gold-500` in Tailwind)
- Headings/stats: bold sans-serif (Inter)
- Taglines: serif italic accent (Source Serif 4) — see `.tagline` in `app/globals.css`
- Body: clean sans-serif (Inter)

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
```

## Not in this build (see SRS, out of scope for the static frontend)

- Notify Me / Contact form backend (MongoDB Atlas + Google Sheets) — the SRS
  scopes this as a separate Vercel serverless function.
- Real photography for faculty, toppers, and batch art.
- Final fact-checked copy for the legal pages (drafted with a placeholder
  review notice on each page — see SRS §4.8 / §5.4).
