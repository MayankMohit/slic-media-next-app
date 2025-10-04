"use client";

import React, { useState } from "react";

export default function CalendlyModal({ url, open, onClose }) {
    if (!open) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/60" onClick={onClose} />
        <div className="relative z-10 w-full max-w-3xl bg-slate-900 rounded-2xl shadow-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div className="font-medium">Schedule a meeting</div>
            <button
              onClick={onClose}
              className="px-3 py-1 rounded-md hover:bg-white/5"
            >
              Close
            </button>
          </div>
          <div className="p-4">
            {/* Inline Calendly widget */}
            <div
              className="calendly-inline-widget"
              data-url={url}
              style={{ minWidth: "320px", height: "560px" }}
            />
            <script
              type="text/javascript"
              src="https://assets.calendly.com/assets/external/widget.js"
              async
            ></script>
          </div>
        </div>
      </div>
    );
}
