"use client";

import React from "react";

export function SpinningBadge() {
  return (
    <div 
      className="fixed bottom-8 left-8 z-50 mix-blend-difference pointer-events-none select-none flex items-center justify-center"
      aria-label="Available for work"
    >
      {/* Static center icon */}
      <div className="absolute text-[#F2F0EB] text-xl">
        ✦
      </div>

      {/* Rotating SVG text */}
      <svg
        className="w-32 h-32 text-[#F2F0EB] opacity-90 [animation:spin_12s_linear_infinite]"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <path
            id="textPath-badge"
            d="M 50, 50
               m -35, 0
               a 35,35 0 1,1 70,0
               a 35,35 0 1,1 -70,0"
          />
        </defs>
        <text className="font-mono text-[10.5px] font-bold tracking-[0.2em] uppercase fill-current">
          <textPath href="#textPath-badge" startOffset="0%">
            AVAILABLE FOR WORK • AVAILABLE FOR WORK •
          </textPath>
        </text>
      </svg>
    </div>
  );
}
