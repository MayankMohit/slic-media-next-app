"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function splitChars(el) {
  const txt = el.textContent || "";
  el.textContent = "";
  const frag = document.createDocumentFragment();
  for (const ch of txt) {
    const outer = document.createElement("span");
    outer.className = "cg-char-outer";
    const inner = document.createElement("span");
    inner.className = "cg-char-inner";
    inner.textContent = ch;
    outer.appendChild(inner);
    frag.appendChild(outer);
  }
  el.appendChild(frag);
  return el.querySelectorAll(".cg-char-inner");
}

export default function ServicesSection() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const titles = Array.from(root.querySelectorAll(".cg-card-title h1"));
    const splitMap = new Map();
    titles.forEach((t) => splitMap.set(t, splitChars(t)));

    const reveal = (card) => {
      const title = card.querySelector(".cg-card-title h1");
      const desc = card.querySelector(".cg-card-desc p");
      if (!title || !desc) return;
      const chars = splitMap.get(title);
      gsap.killTweensOf(chars);
      gsap.killTweensOf(desc);
      gsap.to(chars, {
        xPercent: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.02,
      });
      gsap.to(desc, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.1,
      });
    };

    const hide = (card) => {
      const title = card.querySelector(".cg-card-title h1");
      const desc = card.querySelector(".cg-card-desc p");
      if (!title || !desc) return;
      const chars = splitMap.get(title);
      gsap.killTweensOf(chars);
      gsap.killTweensOf(desc);
      gsap.to(chars, {
        xPercent: 20,
        opacity: 0,
        duration: 0.01,
        ease: "power2.in",
        stagger: 0.008,
      });
      gsap.to(desc, { opacity: 0, y: 12, duration: 0.01, ease: "power2.in" });
    };
    

    const cards = Array.from(root.querySelectorAll(".cg-card"));

    const first = cards[0];
    if (first) {
      const imgWrap = first.querySelector(".cg-card-image");
      const img = first.querySelector(".cg-card-image img");
      const marquee = first.querySelector(".cg-card-marquee");
      const desc = first.querySelector(".cg-card-desc p");
      const tEl = first.querySelector(".cg-card-title h1");

      if (imgWrap) gsap.set(imgWrap, { scale: 0.5, borderRadius: "100px" });
      if (img) gsap.set(img, { scale: 1.6 });
      if (desc) gsap.set(desc, { opacity: 0, y: 12 });
      if (tEl) gsap.set(splitMap.get(tEl), { xPercent: 20, opacity: 0 });

      let shown = false;
      ScrollTrigger.create({
        trigger: first,
        start: "top 20%",
        end: "+=180vh",
        scrub: true,
        
        onUpdate: (st) => {
          const p = st.progress;
          if (imgWrap)
            gsap.to(imgWrap, {
              scale: 0.5 + 0.5 * p,
              borderRadius: `${100 - 64 * p}px`,
              duration: 0.001,
            });
          if (img) gsap.to(img, { scale: 1.6 - 0.6 * p, duration: 0.001 });
          if (marquee) {
            const s = 0.25,
              e = 0.55;
            const local = p <= s ? 0 : p >= e ? 1 : (p - s) / (e - s);
            gsap.to(marquee, { opacity: 1 - local, duration: 0.001 });
          }
          if (p >= 0.98 && !shown) {
            shown = true;
            reveal(first);
          }
          if (p < 0.98 && shown) {
            shown = false;
            hide(first);
          }
        },
      });
    }

    cards.forEach((card, i) => {
      const isLast = i === cards.length - 1;
      ScrollTrigger.create({
        trigger: card,
        start: "top top",
        end: isLast
          ? "+=800vh"
          : () => (cards[i + 1] ? "+=400vh" : "+=100vh"),
        pin: true,
        pinSpacing: true, 
        snap: {
          snapTo: 1,       // always snap to the next
          duration: 1,
          ease: "power2.inOut",
        },
      });
    });

    cards.forEach((card, i) => {
      if (i === cards.length - 1) return;
      const wrap = card.querySelector(".cg-card-wrap");
      const imgWrap = card.querySelector(".cg-card-image");

      if (imgWrap) {
        gsap.set(imgWrap, {
          transformPerspective: 1000,
          transformOrigin: "50% 50%",
          backfaceVisibility: "hidden",
        });
      }

      if (!wrap) return;
      ScrollTrigger.create({
        trigger: cards[i + 1],
        start: "top bottom",
        end: "top top",
        scrub: 1,
        onUpdate: (st) => {
          const p = st.progress;
          gsap.to(wrap, {
            scale: 1 - 0.3 * p,
            opacity: 1 - p,
            translateY: 400 * p,
            duration: 0.1,
          });
          if (imgWrap) gsap.to(imgWrap, { rotateX: 16 * p, duration: 0.1 });
        },
      });
    });

    cards.forEach((card, i) => {
      if (i === 0) return; // except first card
      const imgWrap = card.querySelector(".cg-card-image");
      const img = card.querySelector(".cg-card-image img");
      if (!imgWrap || !img) return;
      gsap.set(imgWrap, {
        borderRadius: "60px",
        translateY: -200,
        rotateX: -18,
        transformPerspective: 1000,
        transformOrigin: "50% 50%",
        backfaceVisibility: "hidden",
      });
      gsap.set(img, { scale: 1.8 });
      ScrollTrigger.create({
        trigger: card,
        start: "top bottom",
        end: "top top",
        scrub: true,
        onUpdate: (st) => {
          const p = st.progress;
          gsap.to(imgWrap, {
            borderRadius: `${60 - 24 * p}px`,
            translateY: -200 + 200 * p,
            rotateX: -18 + 18 * p, // to 0
            duration: 0.001,
          });
          gsap.to(img, { scale: 1.8 - 0.8 * p, duration: 0.001 });
        },
      });
    });

    cards.forEach((card, i) => {
      if (i === 0) return;
      const tEl = card.querySelector(".cg-card-title h1");
      const desc = card.querySelector(".cg-card-desc p");
      if (tEl) gsap.set(splitMap.get(tEl), { xPercent: 20, opacity: 0 });
      if (desc) gsap.set(desc, { opacity: 0, y: 12 });
      ScrollTrigger.create({
        trigger: card,
        start: "top top",
        end: "+=1",
        onEnter: () => reveal(card),
        onLeaveBack: () => hide(card),
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div
      ref={rootRef}
      className="bg-background text-foreground overflow-x-hidden"
    >
      <section className="relative flex flex-col gap-[5vh] perspective-1000">
        {/* Card 1 */}
        <article className="cg-card h-screen relative px-6 md:px-10">
          <div className="cg-card-marquee pointer-events-none absolute inset-0 flex items-start mt-15 justify-center overflow-hidden opacity-100">
            <div className="flex gap-16 text-[12vw] font-extrabold opacity-20 whitespace-nowrap will-change-transform animate-[cg-marquee_18s_linear_infinite]">
              <span>Creative that converts</span>
              <span>Creative that converts</span>
              <span>Creative that converts</span>
              <span>Creative that converts</span>
            </div>
          </div>
          <div className="cg-card-wrap absolute inset-10">
            <div className="cg-card-image absolute inset-0 overflow-hidden rounded-[36px]">
              <Image
                src="/test/1.jpg"
                alt=""
                fill
                className="object-cover will-change-transform"
                priority
              />
            </div>
            <div className="relative z-10 h-full grid">
              <div className="cg-card-title pointer-events-none absolute inset-0 grid place-items-center">
                <h1 className="text-[clamp(44px,8vw,70px)] font-medium tracking-[-0.02em] leading-[1.02] text-white">
                  Viral Ad Creative Production
                </h1>
              </div>
              <div className="cg-card-desc self-end pb-10 md:pb-14 grid place-items-center">
                <p className="w-[min(80vw,500px)] text-center text-lg md:text-xl text-white">
                  Scroll-stopping ads for TikTok, Meta, Applovin & more—designed
                  to drive sales.
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Card 2 */}
        <article className="cg-card h-screen relative px-6 md:px-10">
          <div className="cg-card-wrap absolute inset-10">
            <div className="cg-card-image absolute inset-0 overflow-hidden rounded-[36px]">
              <Image
                src="/test/2.jpg"
                alt=""
                fill
                className="object-cover will-change-transform"
              />
            </div>
            <div className="relative z-10 h-full grid">
              <div className="cg-card-title pointer-events-none absolute inset-0 grid place-items-center">
                <h1 className="text-[clamp(44px,8vw,70px)] font-medium tracking-[-0.02em] leading-[1.02] text-white">
                  Social Media Content Strategy
                </h1>
              </div>
              <div className="cg-card-desc self-end pb-10 md:pb-14 grid place-items-center">
                <p className="w-[min(80vw,500px)] text-center text-lg md:text-xl  text-white">
                  From zero to viral—data-backed growth strategies tailored for
                  Instagram, TikTok & YouTube Shorts.
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Card 3 */}
        <article className="cg-card h-screen relative px-6 md:px-10">
          <div className="cg-card-wrap absolute inset-10">
            <div className="cg-card-image absolute inset-0 overflow-hidden rounded-[36px]">
              <Image
                src="/test/3.jpg"
                alt=""
                fill
                className="object-cover will-change-transform"
              />
            </div>
            <div className="relative z-10 h-full grid ">
              <div className="cg-card-title pointer-events-none absolute inset-0 grid place-items-center">
                <h1 className="text-[clamp(44px,8vw,70px)] font-medium tracking-[-0.02em] leading-[1.02] text-white">
                  Brand Growth Package
                </h1>
              </div>
              <div className="cg-card-desc self-end pb-10 md:pb-14 grid place-items-center">
                <p className="w-[min(80vw,500px)] text-center text-lg md:text-xl text-white">
                  Content scripting, research & editing—all in one package to
                  scale your brand fast.
                </p>
              </div>
            </div>
          </div>
        </article>
      </section>

      <style jsx>{`
        .cg-char-outer {
          display: inline-block;
          overflow: hidden;
        }
        .cg-char-inner {
          display: inline-block;
          transform: translateX(20%);
          opacity: 0;
        }
        @keyframes cg-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-25%);
          }
        }
      `}</style>
    </div>
  );
}
