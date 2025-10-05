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

  const stats = [
    { id: "s1", label: "Followers in 90 days", value: 150000, suffix: "" },
    { id: "s2", label: "Revenue influenced", value: 50, suffix: "M" },
    { id: "s3", label: "Avg ROAS increase", value: 5, suffix: "x" },
  ];

  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const statRefs = useRef({});
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

    // Counter animation when Results box enters viewport
    stats.forEach((s) => {
      const el = statRefs.current[s.id];
      if (!el) return;

      const obj = { val: 0 };
      gsap.to(obj, {
        val: s.value,
        duration: 1.6,
        ease: "power1.out",
        scrollTrigger: {
          trigger: cardRefs.current[1], // Results box
          start: "top 60%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          el.innerText =
            s.value >= 1000
              ? Math.floor(obj.val).toLocaleString() + (s.suffix || "")
              : Math.floor(obj.val) + (s.suffix || "");
        },
      });
    });

    return () => {
      gsap.killTweensOf(cards);
      stats.forEach((s) => {
        const el = statRefs.current[s.id];
        if (el) el.innerText = "";
      });
    };
  }, []);

  const handleFlip = (id, state) => {
    setFlipped((p) => ({ ...p, [id]: state }));
  };

  const cardBaseClasses =
    "rounded-2xl p-6 md:px-6 md:py-8 flex flex-col justify-between border border-zinc-800 hover:shadow-[0px_0px_10px_rgba(192,192,192,0.5)] transition-shadow";

  return (
    <section
      ref={containerRef}
      className="relative max-w-5xl mx-auto px-6 md:px-8 py-10 mt-30"
      aria-label="testimonials-bento"
      style={{ borderRadius: 32 }}
    >
      <div className="grid grid-cols-6 gap-6">
        {/* --- Big Testimonial --- */}
        <article
          ref={(el) => (cardRefs.current[0] = el)}
          className={`col-span-6 md:col-span-3 bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-950 ${cardBaseClasses} min-h-[300px]`}
        >
          <div>
            <div className="text-[#0697a7] text-sm font-medium mb-5">
              Client highlight
            </div>
            <blockquote className="text-zinc-100 text-lg md:text-xl font-semibold leading-snug">
              “{testimonials[0].short}”
            </blockquote>
            <p className="mt-3 text-sm text-zinc-500 line-clamp-5">
              {testimonials[0].full}
            </p>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-zinc-700 overflow-hidden shrink-0">
                <Image
                  src={testimonials[0].avatar}
                  width={48}
                  height={48}
                  alt={testimonials[0].name}
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-zinc-100 font-medium">
                  {testimonials[0].name}
                </div>
                <div className="text-sm text-zinc-500">
                  {testimonials[0].role}
                </div>
              </div>
            </div>
            <a
              href="#contact"
              className="px-3 py-2 bg-[#09749e] text-zinc-900 rounded-md text-sm font-semibold hover:brightness-105 transition"
            >
              Work with us
            </a>
          </div>
        </article>

        {/* --- Results box --- */}
        <div
          ref={(el) => (cardRefs.current[1] = el)}
          className={`col-span-6 md:col-span-3 bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-950 ${cardBaseClasses} min-h-[300px] `}
        >
          <div>
            <div className="text-[#0697a7] text-sm font-medium mb-5">
              Results
            </div>
            <h4 className="text-zinc-100 font-bold text-2xl">
              Proven outcomes
            </h4>
          </div>
          <div className="flex justify-center items-center gap-4 mt-6">
            {stats.map((s) => (
              <div key={s.id} className="text-center bg-white/3 rounded-lg p-7">
                <div
                  ref={(el) => (statRefs.current[s.id] = el)}
                  className="text-xl font-bold text-white"
                >
                  0
                </div>
                <div className="text-xs text-slate-300/60 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* --- small bento cards row (3) --- */}
        {testimonials.slice(1, 4).map((t, idx) => (
          <article
            key={t.id}
            ref={(el) => (cardRefs.current[2 + idx] = el)}
            className={`col-span-6 sm:col-span-3 md:col-span-2 bg-gradient-to-tr from-zinc-950 to-zinc-900 ${cardBaseClasses} min-h-[300px] relative overflow-hidden`}
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
                  className="front w-full h-full absolute inset-0 p-4"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <div className="text-[#0697a7] text-xs font-medium mb-2">
                    Client quote
                  </div>
                  <div className="text-white font-semibold">{t.short}</div>
                  <div className="text-zinc-300 mt-3 text-sm line-clamp-3">
                    {t.full}
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-700">
                      <Image
                        src={t.avatar}
                        width={40}
                        height={40}
                        alt={t.name}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">
                        {t.name}
                      </div>
                      <div className="text-zinc-300 text-xs">{t.role}</div>
                    </div>
                  </div>
                </div>
                {/* BACK */}
                <div
                  className="back w-full h-full absolute inset-0 p-4"
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                    borderRadius: 12,
                  }}
                >
                  <div className="text-[#0697a7] text-xs font-medium mb-2">
                    Full story
                  </div>
                  <div className="text-white text-sm leading-relaxed">
                    {t.full}
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="text-zinc-400 text-xs">
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
          className={`col-span-6 bg-[#09749e] ${cardBaseClasses} min-h-[100px] flex flex-row items-center justify-between max-h-5`}
        >
          <div>
            <div className="text-zinc-900 font-bold text-lg">
              Ready to scale your brand?
            </div>
            <div className="text-zinc-950/55 text-sm mt-1 font-semibold">
              Book a free strategy call and let's build your next viral
              campaign.
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="px-5 py-3 bg-zinc-900 text-[#0697a7] font-bold uppercase rounded-lg hover:scale-105 transition"
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
