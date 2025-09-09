"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTab, setIsTab] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTab(width >= 640 && width < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Work", href: "/work" },
  ];

  return (
    <header className="relative z-50">
      <nav className="fixed left-1/2 top-3 w-[95%] -translate-x-1/2 lg:w-[70%] bg-theme/20 backdrop-blur rounded-lg">
        <div className="w-full px-4 py-2 md:px-8">
          <div className="flex w-full items-center justify-between">
            <Link href="/" className="group flex items-center">
              <Image
                src="/logos/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="h-10 w-10 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 backdrop-brightness-1000"
              />
              <span className="uppercase tracking-tight text-foreground font-semibold text-2xl">Slic Media</span>
            </Link>

            {!isMobile && !isTab && (
              <div className="flex items-center space-x-8 text-foreground uppercase tracking-wide">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="font-medium hover:opacity-80"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}

            {!isMobile && !isTab && (
              <Link
                href="/contact"
                className="rounded-lg border border-foreground/20 bg-transparent px-4 py-2 text-sm font-semibold text-foreground hover:bg-foreground/10"
              >
                Book a Meet
              </Link>
            )}

            {(isMobile || isTab) && (
              <button
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                className="relative flex h-8 w-8 flex-col items-center justify-center"
              >
                <span
                  className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${
                    isMobileMenuOpen ? "translate-y-1.5 rotate-45" : ""
                  }`}
                />
                <span
                  className={`my-1 block h-0.5 w-6 bg-foreground transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${
                    isMobileMenuOpen ? "-translate-y-1.5 -rotate-45" : ""
                  }`}
                />
              </button>
            )}
          </div>

          {(isMobile || isTab) && (
            <div
              className={`absolute left-0 right-0 top-full overflow-hidden bg-theme text-foreground backdrop-blur transition-all duration-300 ${
                isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="space-y-6 px-6 py-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-lg font-bold"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  className="w-full rounded-lg border border-foreground/20 bg-transparent px-6 py-3 text-center text-sm font-semibold text-foreground hover:bg-foreground/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
