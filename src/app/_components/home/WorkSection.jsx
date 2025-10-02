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

  useEffect(() => {
    const root = rootRef.current;
    const a = leftA.current;
    const b = leftB.current;
    const c = rightC.current;
    const para = paraRef.current;
    if (!root || !a || !b || !c || !para) return;

    // clean existing triggers if hot-reloading in dev
    ScrollTrigger.getAll().forEach((t) => t.kill());

    // initial states: offscreen and invisible
    gsap.set(a, { x: "-130vw", opacity: 0, y: -200, scale: 2.5 });
    gsap.set(b, { x: "-130vw", opacity: 0, y: 200, scale: 2.5 });
    gsap.set(c, { x: "130vw", opacity: 0, y: 0, scale: 2.5 });
    gsap.set(para, { opacity: 0, y: 10 });

    // timeline controlled by scroll (pin the section while animating)
    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      scrollTrigger: {
        trigger: root,
        start: "top 15%", // when animation starts
        end: () => `+=${window.innerHeight * 2}`, // length of scroll drive
        scrub: 2, // smooth scrub
        pin: true, // pin section while anim plays
        anticipatePin: 0.2,
      },
    });

    // 1) slide in from sides to center positions
    tl.to(a, { x: "0vw", opacity: 1, y: -200, duration: 3.5 }, 0);
    tl.to(c, { x: "0vw", opacity: 1, y: 0, duration: 3.5 }, 0.05);
    tl.to(b, { x: "0vw", opacity: 1, y: 200, duration: 3.5 }, 0);

    // 2) move slightly closer to center
    tl.to(
      [a, b, c],
      {
        x: "0vw",
        y: 0,
        duration: 1.5,
        ease: "power3.inOut",
        stagger: 0, // small cascade if you want a visual order; remove for simultaneous
      },
      "+=0"
    );

    // 3) group shrink / finalize position (keeps small gap between them)
    tl.to(
      [a, b, c],
      { scale: 0.46, y: -200, duration: 2.5, stagger: 0, ease: "power3.out" },
      "+=0.1"
    );

    // 4) paragraph reveal with upward motion & subtle letter stagger (via text mask-ish)
    tl.to(
      para,
      { opacity: 1, y: 0, duration: 2.7, ease: "power3.out" },
      "-=1.5"
    );

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
      <div className="max-w-xl mx-auto px-6 md:px-8 py-28 md:py-36 flex flex-col items-center">
        {/* visual area where the three headlines animate */}
        <div className="relative w-full h-[34vh] md:h-[40vh] lg:h-[44vh] flex items-center justify-center">
          {/* all three are centered (left:50%) and we move them via GSAP 'x' in vw units */}
          <h1
            ref={leftA}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(36px,8vw,96px)] font-extrabold leading-[0.9] tracking-tight whitespace-nowrap pointer-events-none select-none"
          >
            What I do
          </h1>

          <h1
            ref={leftB}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(36px,8vw,96px)] font-extrabold leading-[0.9] tracking-tight whitespace-nowrap pointer-events-none select-none"
          >
            What I do
          </h1>

          <h1
            ref={rightC}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(36px,8vw,96px)] font-extrabold leading-[0.9] tracking-tight whitespace-nowrap pointer-events-none select-none"
          >
            What I do
          </h1>
        </div>

        {/* paragraph that appears after the merge */}
        <p
          ref={paraRef}
          className="-mt-80 mb-35 w-[50vw] text-center text-lg md:text-xl text-zinc-300 opacity-0"
        >
          I craft high-performance video & ad content, building scroll-driven
          interactions and thumb-stopping creative that converts — from concept,
          scripting and production to data-driven optimization.<br />  
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia blanditiis, placeat sunt inventore laboriosam consequuntur veniam cupiditate quaerat officiis optio, facere praesentium architecto soluta pariatur odit, ducimus totam id amet.
        </p>
      </div>
    </section>
  );
}
