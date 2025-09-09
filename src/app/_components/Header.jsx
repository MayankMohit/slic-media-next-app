"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
          delay: 0.15,
        }}
        className="fixed left-1/2 top-3 w-[95%] -translate-x-1/2 lg:w-[70%] bg-theme/30 backdrop-blur rounded-lg shadow-md"
      >
        <div className="w-full px-4 py-2 md:px-5">
          <div className="flex w-full items-center justify-between">
            <Link href="/" className="group flex items-center">
              <Image
                src="/myLogos/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="h-10 w-10 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
              />
              <span className="uppercase tracking-tight text-foreground font-semibold text-xl ml-3">
                Slic Media
              </span>
            </Link>

            {/* Desktop Navigation */}
            {!isMobile && !isTab && (
              <div className="flex items-center space-x-8 text-foreground uppercase tracking-wide font-semibold">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="font-medium hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Desktop CTA */}
            {!isMobile && !isTab && (
              <div className="relative group rounded-lg overflow-hidden p-[1px]">
                <div
                  className="absolute -z-10 animate-spin-slow"
                  style={{
                    background: `conic-gradient(
                      from 122deg at 100% 100%,
                      transparent 0%,
                      #727272 100%
                    )`,
                    width: "60%", // Base width of the triangle
                    height: "210%", // Height of the triangle
                    left: "20%",
                    top: "10%",
                    transformOrigin: "60% 20%",
                    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)", // Triangle shape
                    filter:
                      "drop-shadow(0 0 6px rgba(255,255,255,0.55)) drop-shadow(0 0 18px rgba(255,255,255,0.35)) drop-shadow(0 0 36px rgba(220,220,220,0.25))",
                  }}
                />
                <Link
                  href="/contact"
                  className="relative block rounded-lg border border-foreground/10 bg-zinc-800 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-900 transition-colors backdrop-blur-3xl"
                >
                  Book a Meet
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            {(isMobile || isTab) && (
              <button
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                className="relative flex h-8 w-8 flex-col items-center justify-center focus:outline-none"
                aria-label="Toggle menu"
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

          {/* Mobile Menu */}
          {(isMobile || isTab) && (
            <div
              className={`absolute left-0 right-0 top-full overflow-hidden bg-theme text-foreground backdrop-blur transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="space-y-6 px-6 py-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-lg font-bold hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="relative group w-full rounded-lg overflow-hidden p-[1px]">
                  <div
                    aria-hidden
                    className="absolute inset-0 -z-10 animate-spin-slow"
                    style={{
                      background: `conic-gradient(
                        from 0deg,
                        rgba(168,85,247,0.4),
                        rgba(59,130,246,0.4),
                        rgba(34,197,94,0.4),
                        rgba(59,130,246,0.4),
                        transparent 80deg
                      )`,
                      width: "150%",
                      height: "150%",
                      left: "-25%",
                      top: "-25%",
                    }}
                  />
                  <Link
                    href="/contact"
                    className="relative block w-full rounded-lg border border-foreground/20 bg-theme/80 px-6 py-3 text-center text-sm font-semibold text-foreground hover:bg-theme/95 transition-colors backdrop-blur"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.nav>
    </header>
  );
}
