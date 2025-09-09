import React from "react";
import Image from "next/image";
import NoiseBG from "../NoiseBG";

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

  // Fixed random positions for each logo
  const logoPositions = [
    { x: -260, y: -150 }, // ajio
    { x: 260, y: -150 }, // casio
    { x: 0, y: 170 }, // goibibo
    { x: -360, y: -20 }, // himalaya
    { x: -340, y: 130 }, // loop
    { x: 340, y: -20 }, // maybelline
    { x: -160, y: 80 }, // nb
    { x: 0, y: -110 }, // nexa
    { x: 350, y: 130 }, // vh1
    { x: 160, y: 80 }, // viacom
  ];

  // Individual logo sizes
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

  return (
    <div className="w-full h-full">
      <div
        className="h-full w-full relative overflow-hidden flex items-center justify-center"
        style={{
          background:
            "radial-gradient(circle at center, #1e1d21 0%, #000000 100%)",
        }}
      >
        {/* Center "Trusted by" text */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <h3 className="text-3xl font-inter font-semibold text-white/50 tracking-wide select-none">
            <span className="text-amber-200/40">trusted</span> by
          </h3>
        </div>
        {/* Brand logos positioned around the center */}
        {logos.map((logo, index) => {
          const position = logoPositions[index];
          const size = logoSizes[logo] || { width: 80, height: 50 };
          return (
            <div
              key={logo}
              className="absolute transition-all h-auto duration-300 hover:opacity-60 opacity-30 hover:scale-101 hover:translate-x-0 hover:blur-2xl cursor-pointer z-20 no-drag select-none"
              style={{
                left: `calc(50% + ${position.x}px)`,
                top: `calc(50% + ${position.y}px)`,
                transform: "translate(-50%, -50%)",
                filter: "brightness(0) invert(1)", // Make logos white
              }}
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
