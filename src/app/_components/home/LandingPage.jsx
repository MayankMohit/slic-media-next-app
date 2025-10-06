"use client";

import { motion } from "framer-motion";

function LandingPage() {
  return (
    <div
      className="absolute inset-0 h-screen w-full overflow-hidden isolate"
    >
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
          className="ml-[4vw] mt-[9rem]"
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ type: "spring", stiffness: 150, damping: 18 }}
            className="text-[7vw] w-[60vw] font-inter font-bold leading-[6.8vw] tracking-[-3px] text-gray-100 select-none"
          >
            Scale Your{" "}
            <span className="font-raffishly text-[10vw] text-white drop-shadow-lg drop-shadow-amber-100">
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
            className="mt-[8vh] text-[1.5vw] w-[30vw] text-gray-400 ml-2 select-none leading-[3.8vh]"
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
