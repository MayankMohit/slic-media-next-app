"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import CalendlyModal from "../CalendlyModal";

const TestimonialsBento = ({ calendlyUrl }) => {
  const [open, setOpen] = useState(false);

  const url =
    calendlyUrl ||
    process.env.NEXT_PUBLIC_CALENDLY_URL ||
    "https://calendly.com/yourname";

  const testimonials = [
    {
      id: "t1",
      short:
        "SLIC Media’s ad creatives changed the game—our TikTok ROAS went up 5x.",
      full: "SLIC Media reworked our TikTok ad strategy and creatives. Within 6 weeks we saw a 5x ROAS, better CTR and much higher engagement. Their edits are short, punchy and made for the platform.",
      name: "US Client",
      role: "Head of Growth",
      avatar: "/test/avatar.png",
      logo: "/brandLogos/viacom.png",
    },
    {
      id: "t2",
      short: "From 0 to 150K followers in 90 days — SLIC made it happen.",
      full: "SLIC helped us build a repeatable content system and a timeline for creative testing. The growth was real and sustained — we scaled followers and conversions.",
      name: "DTC Brand",
      role: "Founder",
      avatar: "/test/avatar.png",
      logo: "/brandLogos/nexa.png",
    },
    {
      id: "t3",
      short:
        "Editing that converts — lifted our conversions and reduced CPAs across channels.",
      full: "They optimized our video cuts and hooks specifically for Meta; CPCs dropped and conversion rates improved. Their approach is data-informed and practical.",
      name: "Wellness Co.",
      role: "Marketing Lead",
      avatar: "/test/avatar.png",
      logo: "/brandLogos/himalaya.png",
    },
    {
      id: "t4",
      short:
        "Quick turnaround, solid creative strategy and measurable results.",
      full: "Fast delivery cycles, constant iteration and clear KPIs. We got better ad performance and a clearer creative roadmap.",
      name: "App Brand",
      role: "CMO",
      avatar: "/test/avatar.png",
      logo: "/brandLogos/goibibo.png",
    },
  ];

  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const [flipped, setFlipped] = useState({});

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean);
    gsap.from(cards, {
      y: 32,
      opacity: 0,
      duration: 1.5,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      },
    });

    return () => gsap.killTweensOf(cards);
  }, []);

  const handleFlip = (id, state) => {
    setFlipped((p) => ({ ...p, [id]: state }));
  };

  const cardBaseClasses =
    "rounded-2xl p-[1.5vw] md:px-[1.5vw] md:py-[2vw] flex flex-col justify-between border border-zinc-800 hover:shadow-[0px_0px_10px_rgba(192,192,192,0.5)] backdrop-blur-md transition-shadow";

  return (
    <section
      ref={containerRef}
      className="relative max-w-[65vw] mx-auto md:px-8 py-10 mt-[6vh]"
      aria-label="testimonials-bento"
      style={{ borderRadius: 32 }}
    >
      <div className="grid grid-cols-6 gap-[1vw]">
        {/* --- Big Testimonial --- */}
        <article
          ref={(el) => (cardRefs.current[0] = el)}
          className={`col-span-6 md:col-span-3 bg-gradient-to-tr from-zinc-950/25 via-zinc-900/25 to-zinc-950/25 ${cardBaseClasses} min-h-[30vh]`}
        >
          <div>
            <div className="text-[#0697a7] text-[1vw] font-medium mb-[1vw]">
              Client highlight
            </div>
            <blockquote className="text-zinc-100 text-lg md:text-[1.5vw] font-semibold leading-snug">
              “{testimonials[0].short}”
            </blockquote>
            <p className="mt-[1vw] text-[1vw] text-zinc-500 line-clamp-5">
              {testimonials[0].full}
            </p>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-[3vw] h-[3vw] rounded-full bg-zinc-700 overflow-hidden">
                <Image
                  src={testimonials[0].avatar}
                  width={100}
                  height={50}
                  alt={testimonials[0].name}
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-zinc-100 font-medium text-[1.2vw]">
                  {testimonials[0].name}
                </div>
                <div className="text-[1vw] text-zinc-500">
                  {testimonials[0].role}
                </div>
              </div>
            </div>
            <a
              href="#contact"
              className="px-[1vw] py-[1vh] bg-[#0975a0] text-zinc-950 rounded-md text-[1vw] font-semibold hover:brightness-105 transition"
            >
              Work with us
            </a>
          </div>
        </article>

        {/* --- Results box --- */}
        <div
          ref={(el) => (cardRefs.current[1] = el)}
          className={`text-white text-center text-5xl justify-center col-span-6 md:col-span-3 bg-gradient-to-tr from-zinc-950/25 via-zinc-900/25 to-zinc-950/25 ${cardBaseClasses} min-h-[30vh] `}
        >
          Graph
        </div>

        {/* --- small bento cards row (3) --- */}
        {testimonials.slice(1, 4).map((t, idx) => (
          <article
            key={t.id}
            ref={(el) => (cardRefs.current[2 + idx] = el)}
            className={`col-span-6 sm:col-span-3 md:col-span-2 bg-gradient-to-tr from-zinc-950/25 to-zinc-900/25 ${cardBaseClasses} min-h-[42vh] relative overflow-hidden`}
            onMouseEnter={() => handleFlip(t.id, true)}
            onMouseLeave={() => handleFlip(t.id, false)}
          >
            <div
              className="flip-card w-full h-full"
              style={{ perspective: 900 }}
            >
              <div
                className={`flip-inner w-full h-full rounded-xl transition-transform duration-700 transform-style-preserve-3d ${
                  flipped[t.id] ? "rotate-y-180" : ""
                }`}
                style={{
                  transform: flipped[t.id]
                    ? "rotateY(180deg)"
                    : "rotateY(0deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* FRONT */}
                <div
                  className="front w-full h-full absolute inset-0 p-[0.5vw]"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <div className="text-[#0697a7] text-[1vw] font-medium mb-[1vw]">
                    Client quote
                  </div>
                  <div className="text-white font-semibold text-[1vw]">{t.short}</div>
                  <div className="text-zinc-500 mt-[1vw] text-[1vw] line-clamp-3">
                    {t.full}
                  </div>
                  <div className="mt-[1vw] flex items-center gap-[1vw]">
                    <div className="w-[3vw] h-[3vw] rounded-full overflow-hidden bg-zinc-700">
                      <Image
                        src={t.avatar}
                        width={100}
                        height={50}
                        alt={t.name}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-white text-[1vw] font-medium">
                        {t.name}
                      </div>
                      <div className="text-zinc-500 text-[0.8vw]">{t.role}</div>
                    </div>
                  </div>
                </div>
                {/* BACK */}
                <div
                  className="back w-full h-full absolute inset-0 p-[1vw]"
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                    borderRadius: 12,
                  }}
                >
                  <div className="text-[#0697a7] text-[1vw] font-medium mb-[1vw]">
                    Full story
                  </div>
                  <div className="text-white text-[1vw] leading-relaxed">
                    {t.full}
                  </div>
                  <div className="mt-[1vw] flex items-center gap-[1vw]">
                    <div className="text-zinc-400 text-[1vw]">
                      {t.name} • {t.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}

        {/* --- CTA box --- */}
        <div
          ref={(el) => (cardRefs.current[5] = el)}
          className={`col-span-6 bg-[#09749eee] ${cardBaseClasses} min-h-[12vh] flex flex-row items-center justify-between max-h-5`}
        >
          <div>
            <div className="text-zinc-900 font-bold text-[1.3vw]">
              Ready to scale your brand?
            </div>
            <div className="text-zinc-950/55 text-[1vw] mt-[0.2vw] font-semibold">
              Book a free strategy call and let's build your next viral
              campaign.
            </div>
          </div>
          <div className="flex items-center gap-[1vw]">
            <button
              onClick={() => setOpen(true)}
              className="px-[1vw] py-[1.3vh] bg-zinc-900 text-[#0697a7] font-bold uppercase rounded-lg hover:scale-105 transition"
            >
              Book a Meet
            </button>
          </div>
        </div>
        {/* Calendly Modal */}
        <CalendlyModal url={url} open={open} onClose={() => setOpen(false)} />
      </div>
    </section>
  );
};

export default TestimonialsBento;
