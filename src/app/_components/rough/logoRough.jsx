import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

  const logoPositions = [
    { x: -260, y: -150 },
    { x: 260, y: -150 },
    { x: 0, y: 170 },
    { x: -360, y: -20 },
    { x: -340, y: 130 },
    { x: 340, y: -20 },
    { x: -160, y: 80 },
    { x: 0, y: -110 },
    { x: 350, y: 130 },
    { x: 160, y: 80 },
  ];

  const logoSizes = {
    "ajio.png": { width: 130, height: 80 },
    "casio.png": { width: 180, height: 45 },
    "goibibo.png": { width: 160, height: 55 },
    "himalaya.png": { width: 220, height: 50 },
    "loop.png": { width: 255, height: 45 },
    "maybelline.png": { width: 380, height: 60 },
    "nb.png": { width: 190, height: 50 },
    "nexa.png": { width: 220, height: 45 },
    "vh1.png": { width: 120, height: 55 },
    "viacom.png": { width: 195, height: 50 },
  };

  const logoRefs = useRef([]);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    // Scroll animation
    logoRefs.current.forEach((el, index) => {
      if (el) {
        const { x, y } = logoPositions[index];
        gsap.from(el, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            once: true,
            markers: false, // hide markers in production
          },
          opacity: 0,
          x: -x + (Math.abs(y) > 100 ? 50 * Math.sign(x) : 0),
          y: -y + (Math.abs(x) > 100 ? 50 * Math.sign(y) : 0),
          duration: 2,
          ease: "power3.out",
        });

        // Hover animations using event listeners
        el.addEventListener("mouseenter", () => {
          gsap.to(el, {
            opacity: 0.9,
            scale: 1.05,
            duration: 0.3,
            ease: "power1.out",
          });
        });

        el.addEventListener("mouseleave", () => {
          gsap.to(el, {
            opacity: 0.3,
            scale: 1,
            duration: 0.3,
            ease: "power1.out",
          });
        });
      }
    });

    // Cleanup event listeners on unmount
    return () => {
      logoRefs.current.forEach((el) => {
        if (el) {
          el.replaceWith(el.cloneNode(true)); // remove all listeners
        }
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <div
        className="h-full w-full absolute top-0 left-0 inset-0 z-6"
        style={{
          background:
            "radial-gradient(ellipse at center, #c4c4c4 0%, #707070 20%, #000000 60%)",
        }}
      />
      <div
        className="h-full w-full relative overflow-hidden flex items-center justify-center z-10 opacity-90"
        style={{
          background: "linear-gradient(#090909 0%, #0b0b0b 100%)",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <h3 className="text-3xl font-inter font-semibold text-white/50 tracking-wide select-none">
            <span className="text-amber-200/40">trusted</span> by
          </h3>
        </div>

        {logos.map((logo, index) => {
          const position = logoPositions[index];
          const size = logoSizes[logo] || { width: 80, height: 50 };
          return (
            <div
              key={logo}
              ref={(el) => (logoRefs.current[index] = el)}
              className="absolute h-auto select-none opacity-30 z-20 pointer-events-auto"
              style={{
                left: `calc(50% + ${position.x}px)`,
                top: `calc(50% + ${position.y}px)`,
                transform: "translate(-50%, -50%)",
                filter: "brightness(0) invert(1)",
              }}
              draggable="false"
            >
              <Image
                src={`/brandLogos/${logo}`}
                alt={`${logo.split(".")[0]} logo`}
                width={size.width}
                height={size.height}
                className="object-contain"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BrandLogos;
