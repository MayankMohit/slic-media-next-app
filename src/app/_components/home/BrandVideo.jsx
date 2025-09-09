"use client";

import React, { useEffect, useRef, useState } from "react";

const BrandVideo = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onEnded);
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <div className="w-1/2 h-full px-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Brand Video
          </h2>
          <p className="mt-2 text-sm md:text-base text-foreground/70">
            High-converting video ads and branded visuals tailored for growth.
          </p>
        </div>

        <div className="group relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-zinc-800/60 to-zinc-900/60 shadow-2xl backdrop-blur-sm">
          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "radial-gradient(1200px 400px at 10% -10%, rgba(255,255,255,0.06), transparent 40%), radial-gradient(1200px 400px at 110% 110%, rgba(255,255,255,0.06), transparent 40%)",
            }}
          />

          <div className="relative">
            <video
              ref={videoRef}
              src="/videos/cat.mp4"
              className="block w-full aspect-video object-cover"
              preload="metadata"
              controls
            />

            {!isPlaying && (
              <button
                type="button"
                onClick={() => videoRef.current?.play()}
                className="absolute inset-0 grid place-items-center bg-gradient-to-t from-black/40 to-transparent focus:outline-none"
                aria-label="Play video"
              >
                <div className="rounded-full p-4 backdrop-blur bg-white/10 border border-white/20 shadow-xl">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-white"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            )}
          </div>

          <div className="absolute inset-0 ring-1 ring-white/5 rounded-2xl pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default BrandVideo;
