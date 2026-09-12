/**
 * Generic, brand-neutral device glyphs used for the App Ecosystem badges.
 *
 * Deliberately NOT the official Apple / Google Play / Microsoft marks —
 * those are trademarked logos and shouldn't be redrawn, even stylized, for
 * a real storefront-style badge. These are plain outline device shapes
 * (a phone, a desktop monitor, a laptop) paired with the platform's name
 * as text in AppDownloadBadges. Swap for licensed official badge assets
 * (e.g. Google Play's actual badge SVG) once real store listings exist.
 */

function iconProps(className?: string) {
  return {
    viewBox: "0 0 24 24",
    className: className ?? "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };
}

export function SmartphoneIcon({ className }: { className?: string }) {
  return (
    <svg {...iconProps(className)}>
      <rect x="7" y="2.5" width="10" height="19" rx="2.2" />
      <line x1="11" y1="18" x2="13" y2="18" />
    </svg>
  );
}

export function MonitorIcon({ className }: { className?: string }) {
  return (
    <svg {...iconProps(className)}>
      <rect x="2.5" y="4" width="19" height="13" rx="1.8" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

export function LaptopIcon({ className }: { className?: string }) {
  return (
    <svg {...iconProps(className)}>
      <rect x="4" y="4.5" width="16" height="10.5" rx="1.5" />
      <path d="M2 19.5h20l-1.6-3H3.6l-1.6 3z" />
    </svg>
  );
}
