import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "./NavLinks";
import AppDownloadBadges from "./AppDownloadBadges";

const LEGAL_LINKS = [
  { href: "/legal/terms", label: "Terms & Conditions" },
  { href: "/legal/privacy", label: "Privacy Policy" },
  { href: "/legal/refund", label: "Refund & Cancellation Policy" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-950 text-brand-100">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-5 lg:py-16">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-cream p-1.5"
            >
              <Image
                src="/assets/logo-mark.png"
                alt=""
                width={32}
                height={32}
                className="h-full w-full object-contain"
              />
            </span>
            <span className="font-sans text-lg font-extrabold text-white">RankersPro</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-brand-200">
            A results-driven GATE, ESE, PSU and state AE/JE coaching platform, mentoring
            aspirants with faculty who have themselves cleared the exams they teach.
          </p>
        </div>

        <nav aria-label="Site pages">
          <h2 className="text-sm font-bold uppercase tracking-wide text-gold-400">Explore</h2>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="link-focus-dark text-sm text-brand-200 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Legal">
          <h2 className="text-sm font-bold uppercase tracking-wide text-gold-400">Legal</h2>
          <ul className="mt-4 space-y-2.5">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="link-focus-dark text-sm text-brand-200 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-gold-400">Get the App</h2>
          <AppDownloadBadges tone="dark" variant="compact" className="mt-4" />
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-gold-400">
            Partnership Desk
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm text-brand-200">
            <li>
              <a href="mailto:partnerships@rankerspro.com" className="link-focus-dark hover:text-white">
                partnerships@rankerspro.com
              </a>
            </li>
            <li>
              <a href="tel:+918985931112" className="link-focus-dark hover:text-white">
                +91 89859 31112
              </a>
            </li>
            <li className="pt-1 text-brand-300">Hyderabad, Telangana, India</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-800">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-brand-300 sm:flex-row">
          <p>© {year} RankersPro. All rights reserved.</p>
          <p>Content and stats verified prior to publishing.</p>
        </div>
      </div>
    </footer>
  );
}
