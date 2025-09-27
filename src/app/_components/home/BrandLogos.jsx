"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const BrandLogos = () => {
  const logos = [
    "ajio.png",
    "casio.png",
    "goibibo.png",
    "himalaya.png",
    "loop.png",
    "maybelline.png",
    "nb.png",
    "nexa.png",
    "vh1.png",
    "viacom.png",
  ];

  const logoSizes = {
    "ajio.png": { width: 110, height: 80 },
    "casio.png": { width: 160, height: 45 },
    "goibibo.png": { width: 150, height: 55 },
    "himalaya.png": { width: 200, height: 50 },
    "loop.png": { width: 150, height: 45 },
    "maybelline.png": { width: 270, height: 60 },
    "nb.png": { width: 70, height: 70 },
    "nexa.png": { width: 200, height: 45 },
    "vh1.png": { width: 100, height: 55 },
    "viacom.png": { width: 200, height: 50 },
  };

  // 👇 Y offsets (default all 0, tweak manually as needed)
  const logoYOffsets = {
    "ajio.png": 10,
    "casio.png": 10,
    "goibibo.png": 7,
    "himalaya.png": 0,
    "loop.png": -4,
    "maybelline.png": 10,
    "nb.png": 2,
    "nexa.png": 8,
    "vh1.png": 10,
    "viacom.png": 7,
  };

  const marqueeRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;

    // animate marquee infinitely (left to right)
    tweenRef.current = gsap.to(marquee, {
      xPercent: -50,
      repeat: -1,
      duration: 40,
      ease: "linear",
    });

    return () => {
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, []);

  // Duplicate logos for smooth infinite scroll
  const repeatedLogos = [...logos, ...logos];

  const handleMouseEnter = () => {
    if (tweenRef.current) tweenRef.current.pause();
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) tweenRef.current.play();
  };

  return (
    <div className="w-full flex flex-col items-center justify-center relative mt-15 overflow-hidden">
      <h3 className="text-2xl font-inter font-semibold text-white/60 mb-5 select-none">
        <span className="text-amber-200/70">trusted</span> by
      </h3>

      <div
        className="w-full overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={marqueeRef}
          className="flex gap-14 whitespace-nowrap w-max"
          style={{ willChange: "transform" }}
        >
          {repeatedLogos.map((logo, i) => {
            const size = logoSizes[logo] || { width: 150, height: 50 };
            const yOffset = logoYOffsets[logo] ?? 0;

            return (
              <div
                key={i}
                className="opacity-40 hover:opacity-90 transition duration-300 ease-in-out select-none"
                style={{
                  filter: "brightness(0) invert(1)",
                  transform: `translateY(${yOffset}px)`,
                }}
                draggable="false"
              >
                <Image
                  src={`/brandLogos/${logo}`}
                  alt={`${logo.split(".")[0]} logo`}
                  width={size.width}
                  height={size.height}
                  className="object-contain pointer-events-none"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BrandLogos;
