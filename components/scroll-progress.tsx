"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ScrollProgress() {
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!textRef.current) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        allowMotion: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { reduceMotion, allowMotion } = context.conditions as {
          reduceMotion: boolean;
          allowMotion: boolean;
        };

        if (allowMotion) {
          const progressObj = { value: 0 };
          
          gsap.to(progressObj, {
            value: 100,
            ease: "none",
            scrollTrigger: {
              trigger: document.documentElement,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
            onUpdate: () => {
              if (textRef.current) {
                const formatted = Math.round(progressObj.value).toString().padStart(3, "0");
                textRef.current.innerText = `[ ${formatted}% ]`;
              }
            }
          });
        } else if (reduceMotion) {
          gsap.set(textRef.current, { display: "none" });
        }
      }
    );
  }, []);

  return (
    <div 
      className="fixed bottom-8 right-8 z-50 pointer-events-none mix-blend-difference" 
      aria-hidden="true"
    >
      <div 
        ref={textRef}
        className="font-mono text-accent text-sm tracking-widest font-bold"
      >
        [ 000% ]
      </div>
    </div>
  );
}
