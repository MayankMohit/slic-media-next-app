"use client";

import React, { useState } from "react";
import { Mail, Phone, Linkedin, Twitter } from "lucide-react";
import CalendlyModal from "./CalendlyModal";

export default function Footer({ calendlyUrl }) {
  const [open, setOpen] = useState(false);

  const url =
    calendlyUrl ||
    process.env.NEXT_PUBLIC_CALENDLY_URL ||
    "https://calendly.com/yourname";

  return (
    <footer className="bg-[#151c269b] text-slate-300 text-sm pt-[5vh] border-t min-h-[50vh] border-white/10 mt-[10vh]">
      <div className="w-[80vw] mx-auto px-[3vw] md:px-[3vw] ">
        {/* Top grid */}
        <div className="flex justify-between border-b border-white/10 h-[35vh]">
          <h3 className="text-[2vw] font-semibold uppercase tracking-wide">
            Slic Media
          </h3>

          {/* Navigation links */}
          <div className="flex flex-row gap-[5vw]">
            <div className="flex flex-row gap-[5vw]">
              <div>
                <h4 className="text-white font-medium text-[1.1vw] mb-[1vw]">Slic Media</h4>
                <ul className="space-y-1 opacity-80 text-[1vw]">
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
                  <li>
                    <a href="/services" className="hover:underline">
                      Services
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="hover:underline">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-medium text-[1.1vw] mb-[1vw]">What we do</h4>
                <ul className="space-y-1 opacity-80 text-[1vw]">
                  <li>Video Production</li>
                  <li>Brand Campaigns</li>
                  <li>Motion Graphics</li>
                  <li>Post-Production</li>
                </ul>
              </div>
            </div>

            {/* Contact / CTA section */}
            <div>
              <h4 className="text-white font-medium text-[1.1vw] mb-[1vw]">Get in touch</h4>
              <div className="space-y-2 opacity-80 text-[1vw]">
                <div className="flex items-center gap-[0.5vw]">
                  <Phone size={18} />
                  <span>+91 99999 99999</span>
                </div>
                <div className="flex items-center gap-[0.5vw]">
                  <Mail size={18} />
                  <a
                    href="mailto:info@slicmedia.com"
                    className="hover:underline"
                  >
                    info@slicmedia.com
                  </a>
                </div>
                <div className="flex items-center gap-[2vw] mt-[1vw]">
                  <a href="#" className="hover:text-white">
                    <Linkedin size={20} />
                  </a>
                  <a href="#" className="hover:text-white">
                    <Twitter size={20} />
                  </a>
                </div>
                <button
                  onClick={() => setOpen(true)}
                  className="mt-[2vw] px-[1.2vw] text-[1vw] py-[0.8vw] rounded-md border border-white/20 hover:bg-white/10 transition"
                >
                  Book a Meeting
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom legal strip */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[0.9vw] text-slate-500 h-[10vh]">
          <p>© {new Date().getFullYear()} Slic Media. All rights reserved.</p>
          <div className="flex flex-wrap gap-[1vw]">
            <a href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:underline">
              Terms of Use
            </a>
            <a href="/cookies" className="hover:underline">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>

      <CalendlyModal url={url} open={open} onClose={() => setOpen(false)} />
    </footer>
  );
}
