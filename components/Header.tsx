"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS } from "./NavLinks";
import { SmartphoneIcon } from "./icons/DeviceIcons";

/**
 * Sticky site header with desktop nav + a prominent "Explore Batches" CTA,
 * and a slide-down mobile menu. Client component only for the mobile-menu
 * toggle state — everything else is static markup, safe for static export.
 */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-100 bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/80">
      <div className="container-page flex h-16 items-center justify-between sm:h-20">
        <Link
          href="/"
          className="link-focus flex items-center gap-2"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/assets/logo-mark.png"
            alt=""
            aria-hidden="true"
            width={40}
            height={40}
            priority
            className="h-9 w-9 sm:h-10 sm:w-10"
          />
          <span className="font-sans text-lg font-extrabold text-brand-900 sm:text-xl">
            RankersPro
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden lg:flex lg:items-center lg:gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="link-focus text-sm font-semibold text-brand-800 transition-colors hover:text-gold-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <Link
            href="/#app-ecosystem"
            className="link-focus flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors hover:text-gold-600"
          >
            <SmartphoneIcon className="h-4 w-4" />
            Get App
          </Link>
          <Link href="/batches" className="btn-primary">
            Explore Batches
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="link-focus inline-flex items-center justify-center rounded-md p-2 text-brand-700 lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2}>
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav panel */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          className="border-t border-brand-100 bg-cream lg:hidden"
        >
          <ul className="container-page flex flex-col gap-1 py-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="link-focus block rounded-md px-2 py-3 text-base font-semibold text-brand-800 hover:bg-brand-50"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#app-ecosystem"
                className="link-focus flex items-center gap-2 rounded-md px-2 py-3 text-base font-semibold text-brand-800 hover:bg-brand-50"
                onClick={() => setMenuOpen(false)}
              >
                <SmartphoneIcon className="h-5 w-5" />
                Get the App
              </Link>
            </li>
            <li className="pt-2">
              <Link
                href="/batches"
                className="btn-primary w-full"
                onClick={() => setMenuOpen(false)}
              >
                Explore Batches
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
