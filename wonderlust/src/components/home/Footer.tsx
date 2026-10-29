import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "My Profile", href: "/profile" },
];

const supportLinks = [
  { label: "Help Center", href: "/help" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export default function Footer() {
  return (
    <footer className="rounded-t-[24px] bg-neutral-950 text-white">
      <div className="mx-auto max-w-[1440px] px-6 pb-10 pt-16 sm:px-10 lg:px-20">
        {/* Logo + tagline */}
        <div>
          <span className="font-[family-name:var(--font-playfair)] text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Wanderlast
          </span>
          <p className="mt-4 text-sm text-white/80 sm:text-base">
            Your gateway to extraordinary travel experiences around the world.
          </p>
        </div>

        {/* Link columns */}
        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Newsletter */}
          <div>
            <h3 className="font-[family-name:var(--font-playfair)] text-lg uppercase tracking-wide">
              Newsletter
            </h3>
            <p className="mt-3 text-sm text-gray-400">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <form className="mt-5 flex h-11 max-w-[320px] items-center bg-neutral-800 px-4">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-400"
              />
              <button type="submit" aria-label="Subscribe" className="transition-colors hover:text-cyan-600">
                <ArrowUpRight className="h-5 w-5 text-gray-300" />
              </button>
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-[family-name:var(--font-playfair)] text-lg uppercase tracking-wide">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-base text-gray-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-[family-name:var(--font-playfair)] text-lg uppercase tracking-wide">
              Support
            </h3>
            <ul className="mt-5 space-y-4">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-base text-gray-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-[family-name:var(--font-playfair)] text-lg uppercase tracking-wide">
              Contact Us
            </h3>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href="tel:+17869011622"
                  className="text-base text-gray-300 transition-colors hover:text-white"
                >
                  786 901 1622
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@wandarland.com"
                  className="text-base text-gray-300 transition-colors hover:text-white"
                >
                  info@wandarland.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-6 sm:flex-row">
          <p className="text-sm text-gray-400">
            © 2026 Wanderlust. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {/* lucide-react 1.x dropped brand icons, so all three socials are inline SVGs */}
            <a href="https://x.com" aria-label="X" className="text-gray-300 transition-colors hover:text-white">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.4Z" />
              </svg>
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className="text-gray-300 transition-colors hover:text-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href="https://instagram.com" aria-label="Instagram" className="text-gray-300 transition-colors hover:text-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
