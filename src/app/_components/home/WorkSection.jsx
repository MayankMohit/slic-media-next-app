// components/WhatIDoMerge.jsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WorkSection() {
  const rootRef = useRef(null);
  const leftA = useRef(null);
  const leftB = useRef(null);
  const rightC = useRef(null);
  const paraRef = useRef(null);
  const statRefs = useRef({});
  const resultsRef = useRef();

  const cardBaseClasses =
    "rounded-2xl p-6 md:px-6 md:py-8 flex flex-col justify-between border border-zinc-800 hover:shadow-[0px_0px_10px_rgba(192,192,192,0.5)] transition-shadow";

  const stats = [
    { id: "s1", label: "Followers in 90 days", value: 150000, suffix: "" },
    { id: "s2", label: "Revenue influenced", value: 50, suffix: "M" },
    { id: "s3", label: "Avg ROAS increase", value: 5, suffix: "x" },
  ];

  useEffect(() => {
    const root = rootRef.current;
    const a = leftA.current;
    const b = leftB.current;
    const c = rightC.current;
    const para = paraRef.current;
    const res = resultsRef.current;
    if (!root || !a || !b || !c || !para) return;

    const animateRegion = para.querySelector(".color-animate");
    if (animateRegion) {
      const text = animateRegion.textContent;
animateRegion.innerHTML = text
  .split("")
  .map((char) =>
     `<span class="letter">${char}</span>`
  )
  .join("");
    }

    // clean existing triggers if hot-reloading in dev
    ScrollTrigger.getAll().forEach((t) => t.kill());

    // initial states: offscreen and invisible
    gsap.set(a, { x: "-60vw", opacity: 0, y: -200, scale: 2.5 });
    gsap.set(b, { x: "-60vw", opacity: 0, y: 200, scale: 2.5 });
    gsap.set(c, { x: "60vw", opacity: 0, y: 0, scale: 2.5 });
    gsap.set(para, { x: -300, opacity: 0, y: -100 });
    gsap.set(res, { y: 1000 });

    // timeline controlled by scroll (pin the section while animating)
    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      scrollTrigger: {
        trigger: root,
        start: "top+=30% 100%", // when animation starts
        end: () => `+=${window.innerHeight * 5}`, // length of scroll drive
        scrub: 2, // smooth scrub
      },
    });

    ScrollTrigger.create({
      trigger: root,
      start: () => `top 10%`, // pin AFTER 50vh scroll
      end: () => `+=${window.innerHeight * 5}`,
      pin: true,
      anticipatePin: 0,
    });

    // 1) slide in from sides to center positions
    tl.to(a, { x: "0vw", opacity: 1, duration: 10 }, 0);
    tl.to(c, { x: "0vw", opacity: 1, duration: 10 }, 0.05);
    tl.to(b, { x: "0vw", opacity: 1, duration: 10 }, 0);

    // 2) move slightly closer to center
    tl.to(
      [a, b, c],
      {
        x: "0vw",
        y: 0,
        duration: 10,
        ease: "power3.inOut",
        stagger: 0, // small cascade if you want a visual order; remove for simultaneous
      },
      "+=0"
    );

    // 3) group shrink / finalize position (keeps small gap between them)
    tl.to(
      [a, b, c],
      {
        color: "orange",
        x: -300,
        scale: 0.26,
        y: -270,
        duration: 10,
        stagger: 0,
        ease: "power3.out",
      },
      "+=0.1"
    );

    // 4) paragraph reveal with upward motion & subtle letter stagger (via text mask-ish)
    tl.to(
      para,
      {
        x: -300,
        y: -450, // slightly lower than -290 of headlines
        opacity: 1,
        duration: 10,
        ease: "power3.out",
      },
      "-=5" // overlap timing
    );

    tl.to(res, { y: 100, duration: 15, ease: "power2.out" }, "+=0");

    if (animateRegion) {
      const letterEls = animateRegion.querySelectorAll(".letter");
      tl.to(
        letterEls,
        {
          color: "#777777", // amber-400, adjust to taste
          duration: 0.001,
          stagger: 0.04,
        },
        "-=10"
      ); // overlaps with para motion
    }

    stats.forEach((s) => {
      const el = statRefs.current[s.id];
      if (!el) return;
      const obj = { val: 0 };
      tl.to(
        obj,
        {
          val: s.value,
          duration: 7,
          ease: "power1.out",
          onUpdate: () => {
            el.innerText =
              s.value >= 1000
                ? Math.floor(obj.val).toLocaleString() + (s.suffix || "")
                : Math.floor(obj.val) + (s.suffix || "");
          },
        },
        "-=10"
      ); // adjust overlap timing relative to results box animation
    });

    // cleanup on unmount
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={rootRef}
      aria-label="what-i-do-section"
      className="relative w-full text-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-0 py-28 md:py-38 relative flex flex-col items-center">
        {/* Headline animation box */}
        <div className="relative w-full h-[100vh] md:h-[40vh] lg:h-[44vh] flex items-center justify-center">
          <h1
            ref={leftA}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                   text-[clamp(36px,8vw,96px)] font-extrabold leading-[0.9] tracking-tight 
                   whitespace-nowrap pointer-events-none select-none"
          >
            What We Do
          </h1>

          <h1
            ref={leftB}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                   text-[clamp(36px,8vw,96px)] font-extrabold leading-[0.9] tracking-tight 
                   whitespace-nowrap pointer-events-none select-none"
          >
            What We Do
          </h1>

          <h1
            ref={rightC}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                   text-[clamp(36px,8vw,96px)] font-extrabold leading-[0.9] tracking-tight 
                   whitespace-nowrap pointer-events-none select-none"
          >
            What We Do
          </h1>
        </div>

        {/* Paragraph directly below, animates with GSAP */}
        <p
          ref={paraRef}
          className="mt-10 w-[50vw] text-center 
                 text-lg md:text-[3.2rem] uppercase tracking-normal 
                 font-black leading-tight text-zinc-300 opacity-0 "
        >
          <span className="color-animate">
            We craft high-performance video & ad content, building scroll-driven
            interactions and thumb-stopping creative that converts — from
            concept, scripting and production to data driven optimization.
          </span>
        </p>
      </div>

      {/* Results card pinned right */}
      <div className="absolute top-0 right-15 w-[35vw] bg-transparent">
        <div
          ref={resultsRef}
          className={`col-span-6 md:col-span-3 bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-950 ${cardBaseClasses} h-[400px]`}
        >
          <div>
            <div className="text-amber-300 text-sm font-medium mb-5">
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
      </div>
    </section>
  );
}
