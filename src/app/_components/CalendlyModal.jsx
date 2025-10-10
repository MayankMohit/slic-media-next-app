"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CalendlyModal({ url, open, onClose }) {
  const widgetRef = useRef(null);
  const [loading, setLoading] = useState(true);

  // Load Calendly script
  useEffect(() => {
    if (open) {
      setLoading(true);
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
        setLoading(true);
      };
    }
  }, [open]);

  const handleClickOutside = (e) => {
    if (widgetRef.current && !widgetRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Blurred overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
            onClick={handleClickOutside}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Spinner while loading */}
            {loading && (
              <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            )}
          </motion.div>

          {/* Calendly container */}
          <motion.div
            ref={widgetRef}
            className="relative w-[70vw] h-[90vh] bg-transparent rounded-xl shadow-lg flex flex-col"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={loading ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Close button */}
            <div className="absolute top-4 right-12 z-50">
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 text-black rounded-full transition-all duration-200"
              >
                ✕
              </button>
            </div>

            {/* Calendly widget */}
            <iframe
              src={url}
              className="w-full h-full rounded-xl pointer-events-auto"
              onLoad={() => setLoading(false)}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
