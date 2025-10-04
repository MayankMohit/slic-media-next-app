"use client";

import React, { useState } from "react";
import CalendlyModal from "./CalendlyModal";

export default function Footer({ calendlyUrl }) {
  const [open, setOpen] = useState(false);

  const url =
    calendlyUrl ||
    process.env.NEXT_PUBLIC_CALENDLY_URL ||
    "https://calendly.com/yourname";

  return (
    <footer className="w-full border-t border-white/10 mt-16 text-slate-200 bg-transparent">
      <div className="mx-auto max-w-6xl px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Brand */}
        <div>
          <div className="text-lg font-semibold">Slic Media</div>
          <div className="text-sm opacity-70">
            © {new Date().getFullYear()} Slic Media. All rights reserved.
          </div>
        </div>

        {/* Links */}
        <div>
          <div className="font-medium mb-2">Quick Links</div>
          <ul className="space-y-1 text-sm opacity-80">
            <li>
              <a href="/services" className="hover:underline">
                Services
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="/work" className="hover:underline">
                Work
              </a>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div>
          <div className="font-medium mb-2">Book a meeting</div>
          <p className="mb-3 text-sm opacity-80">
            Pick a time that works for you.
          </p>

          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 rounded-lg border bg-white/10 hover:bg-white/20 transition"
          >
            Book a meeting
          </button>
        </div>
      </div>

      {/* Calendly Modal */}
      <CalendlyModal url={url} open={open} onClose={() => setOpen(false)} />
    </footer>
  );
}
