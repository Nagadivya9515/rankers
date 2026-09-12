export interface NavLink {
  href: string;
  label: string;
}

// Single source of truth for primary navigation — used by both the desktop
// and mobile nav in components/Header.tsx.
export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/faculty", label: "Our Faculty" },
  { href: "/achievers", label: "Achievers" },
  { href: "/batches", label: "Batches" },
  { href: "/mentorship", label: "Mentorship" },
  { href: "/resources", label: "Free Resources" },
];
