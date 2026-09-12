import type { CSSProperties } from "react";

/**
 * Elegant Tailwind placeholder shapes used everywhere a real photo/graphic
 * would normally go (faculty portraits, topper photos, batch card art,
 * video thumbnails). No external images are loaded anywhere in this app —
 * every placeholder still carries a strict, descriptive `alt` string so
 * screen readers and search engines get real semantic context even before
 * photography is dropped in.
 */

type PaletteKey = "brand" | "gold" | "cream";

const CIRCLE_PALETTE: Record<PaletteKey, string> = {
  brand: "bg-brand-500 text-cream ring-4 ring-brand-100",
  gold: "bg-gold-500 text-brand-950 ring-4 ring-gold-100",
  cream: "bg-cream text-brand-600 ring-4 ring-brand-100",
};

interface InitialsAvatarProps {
  initials: string;
  alt: string;
  palette?: PaletteKey;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  /** Path under /public to a real portrait. When set, renders the photo instead of the initials circle. */
  photoSrc?: string;
}

const SIZE_MAP: Record<NonNullable<InitialsAvatarProps["size"]>, string> = {
  sm: "h-12 w-12 text-base",
  md: "h-20 w-20 text-2xl",
  lg: "h-28 w-28 text-3xl",
  xl: "h-40 w-40 text-5xl",
};

const RING_MAP: Record<PaletteKey, string> = {
  brand: "ring-4 ring-brand-100",
  gold: "ring-4 ring-gold-100",
  cream: "ring-4 ring-brand-100",
};

/**
 * A rounded, colored circle showing a person's initials in place of a photo,
 * or — once `photoSrc` is supplied — the real portrait itself, cropped to
 * the same circular frame. Rendered as a `role="img"` element (or a real
 * `<img>`) so assistive tech announces the alt text either way.
 */
export function InitialsAvatar({
  initials,
  alt,
  palette = "brand",
  size = "md",
  className = "",
  photoSrc,
}: InitialsAvatarProps) {
  if (photoSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- static export; no image loader needed
      <img
        src={photoSrc}
        alt={alt}
        className={`shrink-0 rounded-full object-cover ${RING_MAP[palette]} ${SIZE_MAP[size]} ${className}`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`flex shrink-0 select-none items-center justify-center rounded-full font-serif font-semibold ${CIRCLE_PALETTE[palette]} ${SIZE_MAP[size]} ${className}`}
    >
      <span aria-hidden="true">{initials}</span>
    </div>
  );
}

interface PlaceholderCardArtProps {
  alt: string;
  label: string;
  icon?: "book" | "cap" | "flag" | "building" | "train" | "map" | "users" | "compass";
  className?: string;
  /** Extra classes for the icon itself — e.g. a group-hover scale transition. */
  iconClassName?: string;
  style?: CSSProperties;
  /** Path under /public to real batch/course creative. When set, renders the photo instead of the CSS placeholder. */
  imageSrc?: string;
}

const ICON_PATHS: Record<NonNullable<PlaceholderCardArtProps["icon"]>, string> = {
  // Open book — general academic / GATE & ESE
  book: "M4 5.5C4 4.67 4.67 4 5.5 4H11v16H5.5A1.5 1.5 0 014 18.5v-13zM20 5.5c0-.83-.67-1.5-1.5-1.5H13v16h5.5a1.5 1.5 0 001.5-1.5v-13z",
  // Graduation cap — state services / PSC
  cap: "M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4.34c0 1.1 3.13 2.98 7 2.98s7-1.88 7-2.98v-4.34L12 17l-7-3.82z",
  // Flag — SSC
  flag: "M5 3v18h2v-7h10l-2-4 2-4H7V3H5z",
  // Building/institute — RRB or state departments
  building: "M4 21V7l8-4 8 4v14h-6v-6h-4v6H4zM9 10h2v2H9v-2zm4 0h2v2h-2v-2zm-4 4h2v2H9v-2zm4 0h2v2h-2v-2z",
  // Train — RRB JE
  train: "M12 2C7.58 2 4 2.5 4 6v10.5A2.5 2.5 0 006.5 19L5 20.5V21h2.5l2-2h5l2 2H19v-.5L17.5 19a2.5 2.5 0 002.5-2.5V6c0-3.5-3.35-4-8-4zM7.5 15A1.5 1.5 0 119 13.5 1.5 1.5 0 017.5 15zm9 0A1.5 1.5 0 1118 13.5 1.5 1.5 0 0116.5 15zM17 10H7V6h10v4z",
  // Map pin — State AE/JE
  map: "M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1114.5 9 2.5 2.5 0 0112 11.5z",
  // Two people — Mentorship
  users: "M8 11a3 3 0 100-6 3 3 0 000 6zm8 0a3 3 0 100-6 3 3 0 000 6zm-8 2c-2.7 0-6 1.34-6 4v2h9v-2c0-1.06.37-2.14 1.06-3.03A9.3 9.3 0 008 13zm8 0c-.34 0-.73.03-1.14.09A4.98 4.98 0 0119 17v2h5v-2c0-2.66-3.3-4-6-4z",
  // Compass — Career Guidance
  compass: "M12 2a10 10 0 100 20 10 10 0 000-20zm3.5 6.5l-2 5.5-5.5 2 2-5.5 5.5-2z",
};

/**
 * A brand-colored rectangular placeholder used for batch/course card art in
 * place of a photograph or illustration — a subtle icon plus a short label,
 * with full semantic alt text for SEO grounding.
 */
export function PlaceholderCardArt({
  alt,
  label,
  icon = "book",
  className = "",
  iconClassName = "",
  style,
  imageSrc,
}: PlaceholderCardArtProps) {
  if (imageSrc) {
    return (
      <div
        className={`relative aspect-[16/9] w-full overflow-hidden rounded-t-xl bg-brand-900 ${className}`}
        style={style}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- static export; no image loader needed */}
        <img src={imageSrc} alt={alt} className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      style={style}
      className={`relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-t-xl bg-brand-gradient ${className}`}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-[0.05]" />
      <div
        aria-hidden="true"
        className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gold-500/10"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/5"
      />
      <div aria-hidden="true" className="flex flex-col items-center gap-2 text-cream">
        <svg
          viewBox="0 0 24 24"
          className={`h-9 w-9 text-gold-400 ${iconClassName}`}
          fill="currentColor"
        >
          <path d={ICON_PATHS[icon]} />
        </svg>
        <span className="px-4 text-center font-sans text-sm font-bold uppercase tracking-wide text-cream/90">
          {label}
        </span>
      </div>
    </div>
  );
}

interface PlaceholderVideoBoxProps {
  alt: string;
  title: string;
  duration: string;
  className?: string;
}

/** A clean placeholder "player" box for the Free Resources video grid. */
export function PlaceholderVideoBox({
  alt,
  title,
  duration,
  className = "",
}: PlaceholderVideoBoxProps) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative flex aspect-video w-full items-center justify-center rounded-xl bg-brand-900 ${className}`}
    >
      <div
        aria-hidden="true"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-500/90 shadow-card"
      >
        <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-brand-950">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
      <span
        aria-hidden="true"
        className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-xs font-semibold text-white"
      >
        {duration}
      </span>
      <span className="sr-only">{title}</span>
    </div>
  );
}
