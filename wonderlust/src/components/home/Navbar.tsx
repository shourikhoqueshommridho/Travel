"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserRound } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Add Destination", href: "/add-destination" },
  { label: "My Bookings", href: "/my-bookings" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="absolute left-0 top-0 z-50 w-full px-3 pt-2 sm:px-5">
      <nav className="relative flex min-h-12 items-center justify-between bg-white px-3 py-2 shadow-sm sm:px-5">
        {/* Left: Navigation links */}
        <div className="flex items-center gap-3 md:gap-6">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href ||
                  pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative whitespace-nowrap bg-white py-2 text-[10px] font-medium transition-all duration-200 sm:text-xs ${
                  isActive
                    ? "text-cyan-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-cyan-600"
                    : "text-gray-700 hover:text-cyan-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-cyan-600 after:transition-all after:duration-200 hover:after:w-full"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Center: Logo */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 text-base font-bold tracking-tight text-cyan-600 transition-colors duration-200 hover:text-cyan-700 sm:text-xl"
        >
          Wanderlust
        </Link>

        {/* Right: Authentication links */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/profile"
            aria-current={pathname === "/profile" ? "page" : undefined}
            className={`hidden items-center gap-1 text-[10px] transition-colors duration-200 sm:flex sm:text-xs ${
              pathname === "/profile"
                ? "font-semibold text-cyan-600"
                : "text-gray-700 hover:text-cyan-600"
            }`}
          >
            <UserRound className="h-3 w-3" />
            Profile
          </Link>

          {/* Login */}
          <Link
            href="/login"
            aria-current={pathname === "/login" ? "page" : undefined}
            className={`inline-flex h-7 items-center justify-center rounded-md px-1.5 text-[10px] transition-colors duration-200 sm:px-2 sm:text-xs ${
              pathname === "/login"
                ? "bg-cyan-50 font-semibold text-cyan-700"
                : "text-gray-700 hover:bg-gray-100 hover:text-cyan-600"
            }`}
          >
            Login
          </Link>

          {/* Sign Up */}
          <Link
            href="/signup"
            aria-current={pathname === "/signup" ? "page" : undefined}
            className={`inline-flex h-7 items-center justify-center rounded-md px-1.5 text-[10px] transition-colors duration-200 sm:px-2 sm:text-xs ${
              pathname === "/signup"
                ? "bg-cyan-50 font-semibold text-cyan-700"
                : "text-gray-700 hover:bg-gray-100 hover:text-cyan-600"
            }`}
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}