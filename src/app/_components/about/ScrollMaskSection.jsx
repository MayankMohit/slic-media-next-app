'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollMaskSection({
  textLines = [
    { value: 'This is', className: 'text-[clamp(56px,9vw,150px)]' },
    { value: 'SLIC MEDIA', className: 'text-[clamp(80px,12vw,220px)]' },
  ],
  videoSrc = '/videos/cpu.mp4',
  endOffsetPx = 2000,
}) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.play().catch(() => {});
      }

      const tl = gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: 'top top',
    end: `+=${endOffsetPx}`,
    scrub: 1,
    pin: true,
    anticipatePin: 1,

  },
});

tl.to(containerRef.current, {
  scale: 18,
  opacity: 0,
  ease: 'power3.inOut',
  willChange: 'transform, opacity',
});

    }, sectionRef);

    return () => ctx.revert();
  }, [endOffsetPx]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-black"
    >
      {/* Background video */}
      <video
        ref={videoRef}
        className="fixed inset-0 -z-20 h-full w-full object-cover"
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Text container */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center h-[90vh] w-full text-center opacity-100 pointer-events-none will-change-transform"
        style={{ transformOrigin: 'center center', transform: 'translateZ(0)' }}
      >
        {textLines.map((line, idx) => (
          <React.Fragment key={idx}>
            <h2
              className={`font-black tracking-tight leading-none select-none ${line.className}`}
              style={{ color: '#00BFFF' }}
            >
              {line.value}
            </h2>
            {idx !== textLines.length - 1 && (
              <div className="w-[90%] border-b-2 border-white/40 my-6"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
