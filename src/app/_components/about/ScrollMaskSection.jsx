'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function ScrollMaskSection({
  textLines = [{ value: 'This is SLIC MEDIA', className: 'text-[12vw]' }],
  videoSrc = '/videos/cpu.mp4',
  endOffsetPx = 2000,
}) {
  const sectionRef = useRef(null);
  const maskRef = useRef(null);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.play().catch(() => {});
      }

      const startScale = 1;
      const endScale = 300;

      gsap.set(containerRef.current, { transformOrigin: 'center 90%' });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${endOffsetPx}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const eased = gsap.parseEase('power3.in')(self.progress);
          const scale = startScale + eased * (endScale - startScale);
          gsap.set(containerRef.current, { scale });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [endOffsetPx]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-black"
    >
      <video
        ref={videoRef}
        className="fixed inset-0 -z-10 h-full w-full object-cover"
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
      />

      <div
        ref={maskRef}
        className="flex min-h-screen w-full items-end justify-center bg-white"
        style={{ mixBlendMode: 'screen' }}
      >
        <div ref={containerRef} className="flex flex-col items-center justify-end gap-8 mb-20">
          {textLines.map((line, idx) => (
            <React.Fragment key={idx}>
              <h2
                className={`selection:bg-[#000000] selection:text-white font-black tracking-tight text-black leading-none ${line.className}`}
              >
                {line.value}
              </h2>
              {idx !== textLines.length - 1 && (
                <div className="w-full border-b border-2 border-black my-4" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ScrollMaskSection;
