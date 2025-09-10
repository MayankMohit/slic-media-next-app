"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { createNoise2D } from "simplex-noise";

function LandingPage() {
  const containerRef = useRef(null);
  const interactiveRef = useRef(null);
  const noise = useRef(createNoise2D());

  const blobsCount = 17;

  // Use state to render the blobs initially
  const [blobs, setBlobs] = useState([]);

  useEffect(() => {
    const container = containerRef.current;
    const interactive = interactiveRef.current;
    if (!container || !interactive) return;

    const getBounds = () => container.getBoundingClientRect();
    let bounds = getBounds();
    let width = bounds.width;
    let height = bounds.height;

    const mouse = { x: width / 2, y: height / 2 };

    // followers = first half, drifters = rest
    const followersCount = Math.floor(blobsCount / 2);

    // Init blobs
    const initialBlobs = Array.from({ length: blobsCount }, (_, i) => {
      const isFollower = i < followersCount;
      return {
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        size: 100 + Math.random() * 200,
        // base speed for noise drift
        speed: Math.random() * 0.002,
        noiseX: Math.random() * 1000,
        noiseY: Math.random() * 1000,
        colorVar: `--c${(i % 5) + 2}`,
        opacity: 0.45 + Math.random() * 0.35,
        pulse: 0.008 + Math.random() * 0.004,
        follower: isFollower,
        ease: isFollower ? 0.002 + Math.random() * 0.0005 : 0,
      };
    });
    setBlobs(initialBlobs);

    let raf;
    let last = performance.now();

    const step = (now) => {
      const dt = (now - last) / 1000; // seconds
      last = now;

      // Defensive: refresh bounds if container size changed (e.g., resize)
      const b = getBounds();
      if (b.width !== width || b.height !== height) {
        bounds = b;
        width = b.width;
        height = b.height;
      }

      initialBlobs.forEach((blob, i) => {
        if (blob.follower) {
          // Lerp toward mouse with slower ease
          blob.x += (mouse.x - blob.x) * blob.ease;
          blob.y += (mouse.y - blob.y) * blob.ease;
        } else {
          // Simplex noise drift
          const nX = noise.current(blob.noiseX + now * blob.speed, blob.noiseX);
          const nY = noise.current(blob.noiseY + now * blob.speed, blob.noiseY);
          blob.x += nX * 0.9; // slightly stronger drift
          blob.y += nY * 0.9;
        }

        // Wrap around edges for drifters, clamp for followers to keep visible
        if (blob.follower) {
          const half = blob.size / 2;
          if (blob.x < half) blob.x = half;
          if (blob.y < half) blob.y = half;
          if (blob.x > width - half) blob.x = width - half;
          if (blob.y > height - half) blob.y = height - half;
        } else {
          if (blob.x < -blob.size) blob.x = width + blob.size;
          if (blob.x > width + blob.size) blob.x = -blob.size;
          if (blob.y < -blob.size) blob.y = height + blob.size;
          if (blob.y > height + blob.size) blob.y = -blob.size;
        }

        // Tunables
        const repelRadiusMul = 1.3; // treat effective radius slightly smaller than visual
        const repelStrength = 0.8; // pixels per frame at 60fps equivalent (scaled with dt below)
        const maxRepel = 5; // clamp per-pair correction per frame

        // Compute radii once per loop
        const radii = initialBlobs.map((b) => (b.size * repelRadiusMul) / 2);

        // Simple O(n^2) separation for followers (or apply to all by removing follower checks)
        for (let a = 0; a < initialBlobs.length; a++) {
          const A = initialBlobs[a];
          if (!A.follower) continue; // only followers avoid, or remove this line to include all
          for (let b = a + 1; b < initialBlobs.length; b++) {
            const B = initialBlobs[b];
            // Only repel other followers for a cohesive look; toggle as needed
            if (!B.follower) continue;

            const dx = B.x - A.x;
            const dy = B.y - A.y;
            const d2 = dx * dx + dy * dy;
            const minDist = radii[a] + radii[b];

            if (d2 > 0) {
              const d = Math.sqrt(d2);
              if (d < minDist) {
                // overlap amount
                const overlap = minDist - d;
                // normalized direction away from each other
                const ux = dx / d;
                const uy = dy / d;
                // small push proportional to overlap
                const push = Math.min(
                  maxRepel,
                  overlap * repelStrength * (dt * 60)
                );
                // split the push evenly (½ each) to maintain center of mass
                const px = ux * push * 0.5;
                const py = uy * push * 0.5;
                // apply
                A.x -= px;
                A.y -= py;
                B.x += px;
                B.y += py;
              }
            } else {
              // perfect overlap; nudge randomly
              const px = (Math.random() - 0.5) * 0.5;
              const py = (Math.random() - 0.5) * 0.5;
              A.x -= px;
              A.y -= py;
              B.x += px;
              B.y += py;
            }
          }
        }

        // Gentle scale pulse
        const scale = 0.95 + Math.sin(now * blob.speed * 1000 + i) * 0.05;

        const el = container.querySelector(`[data-id="${i}"]`);
        if (el) {
          el.style.transform = `translate(${blob.x - blob.size / 2}px, ${
            blob.y - blob.size / 2
          }px) scale(${scale})`;
        }
      });

      // Dedicated follower bubble (kept subtle)
      const followerEl = interactive;
      if (followerEl) {
        // Smooth but snappier than follower blobs
        const ease = 0.1;
        const rect = bounds;
        const half = parseFloat(getComputedStyle(followerEl).width) / 2 || 340;
        // Move a hidden current point toward the mouse (reuse mouse if desired)
        // For simplicity, center the follower on mouse with slight ease:
        const fx = mouse.x;
        const fy = mouse.y;
        const prev = followerEl.__pos || {
          x: rect.width / 2,
          y: rect.height / 2,
        };
        prev.x += (fx - prev.x) * ease;
        prev.y += (fy - prev.y) * ease;
        followerEl.__pos = prev;
        followerEl.style.transform = `translate(${prev.x - half}px, ${
          prev.y - half
        }px)`;
      }

      raf = requestAnimationFrame(step);
    };

    const onMove = (e) => {
      mouse.x = e.clientX - bounds.left;
      mouse.y = e.clientY - bounds.top;
    };
    const onResize = () => {
      bounds = getBounds();
      width = bounds.width;
      height = bounds.height;
    };

    container.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", onResize);

    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, [blobsCount]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 h-screen w-full overflow-hidden isolate"
      style={{
        "--bg1": "8 8 9", // dark gray
        "--bg2": "24 24 28", // slightly lighter gray
        "--c1": "90 90 110", // darker muted bluish-gray
        "--c2": "80 85 100", // darker grayish-lavender
        "--c3": "100 95 90", // darker brownish-gray
        "--c4": "110 110 120", // darker neutral gray
        "--c5": "95 100 105", // darker cool gray
      }}
    >
      {/* Goo filter */}
      <svg className="hidden">
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="22" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 24 -12"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </svg>

      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(0deg, rgba(var(--bg1)/1) 0%, rgba(var(--bg2)/1) 100%)`,
        }}
      />
      {/* Bokeh blobs */}
      <div
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        style={{ filter: "url(#goo) brightness(0.8) contrast(0.9)" }}
      >
        {blobs.map((blob) => (
          <div
            key={blob.id}
            data-id={blob.id}
            className="absolute bg-no-repeat bg-center opacity-100 mix-blend-soft-light will-change-transform"
            style={{
              width: `${blob.size}px`,
              height: `${blob.size}px`,
              backgroundImage: `radial-gradient(circle, rgba(var(${blob.colorVar})/${blob.opacity}) 0%, rgba(var(${blob.colorVar})/0.15) 40%, rgba(var(${blob.colorVar})/0) 80%)`,
            }}
          />
        ))}
      </div>

      {/* Mouse follower */}
      <div
        ref={interactiveRef}
        className="pointer-events-none absolute left-0 top-0 w-[var(--circle-size)] h-[var(--circle-size)] bg-no-repeat bg-center opacity-100 mix-blend-soft-light will-change-transform"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(var(--c3)/0.42) 0%, rgba(var(--c3)/0.18) 24%, rgba(var(--c3)/0) 58%)",
        }}
      />
      {/* Text overlay (same content and styling as Hero) */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-start ">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 1 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.2 },
            },
          }}
          className="ml-[3.75rem] mt-[5.5rem]"
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ type: "spring", stiffness: 150, damping: 18 }}
            className="mt-4 text-[100px] w-[60rem] font-inter font-bold leading-[6.3rem] tracking-normal text-gray-100 select-none"
          >
            Scale Your{" "}
            <span className="font-raffishly text-[150px] text-white drop-shadow-lg drop-shadow-amber-100">
              Brand{" "}
            </span>
            with Viral Video Content
          </motion.p>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 18,
              delay: 0.4,
            }}
            className="mt-[3.75rem] text-xl w-[32rem] font-inter font-bold text-gray-400 ml-2 select-none leading-[1.6rem]"
          >
            At SLIC Media, we craft high-converting ad creatives and growth
            strategies that turn clicks into revenue. From TikTok Ads to
            Instagram Reels, we help brands go viral—and stay profitable.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

export default LandingPage;
