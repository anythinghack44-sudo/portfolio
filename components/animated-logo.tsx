"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function AnimatedLogo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const paths = svgRef.current?.querySelectorAll("path");
      if (!paths || paths.length === 0) return;

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
            // Set initial states
            paths.forEach((path) => {
              const length = path.getTotalLength();
              gsap.set(path, {
                strokeDasharray: length,
                strokeDashoffset: length,
                opacity: 1,
              });
            });

            gsap.set(blobRef.current, {
              scale: 0.2,
              opacity: 0,
            });

            // Master timeline for infinite loop
            const tl = gsap.timeline({ repeat: -1 });

            // 1. Draw the logo in white
            tl.to(paths, {
              strokeDashoffset: 0,
              duration: 1.5,
              ease: "power3.inOut",
              stagger: 0.15,
            })
            // 2. Expand and morph the bg-accent blob, change logo color to dark
            .to(blobRef.current, {
              scale: 1,
              opacity: 1,
              borderRadius: "50% 60% 30% 60% / 60% 30% 70% 40%",
              duration: 1.5,
              ease: "power2.inOut",
            }, "+=0.5")
            .to(svgRef.current, {
              color: "#0A0A0A", // Dark color for contrast against accent
              duration: 0.5,
              ease: "power1.inOut"
            }, "<0.5") // Sync with blob expansion
            
            // 3. Morph blob some more for organic feel
            .to(blobRef.current, {
              borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%",
              duration: 1.5,
              ease: "power2.inOut",
            })
            
            // 4. Shrink blob back, revert logo to white
            .to(blobRef.current, {
              scale: 0.2,
              opacity: 0,
              borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
              duration: 1.2,
              ease: "power2.inOut",
            }, "+=0.5")
            .to(svgRef.current, {
              color: "#F2F0EB", // Off-white
              duration: 0.5,
              ease: "power1.inOut"
            }, "<0.2")

            // 5. Erase the logo to prepare for loop
            .to(paths, {
              strokeDashoffset: (i, target) => target.getTotalLength(),
              duration: 1.2,
              ease: "power3.inOut",
              stagger: 0.1,
            }, "+=0.2");
            
          } else if (reduceMotion) {
            // Fallback for reduced motion: instantly draw, no loop
            gsap.set(paths, { opacity: 1, strokeDasharray: "none" });
            gsap.set(blobRef.current, { display: "none" });
          }
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative flex items-center justify-center size-12">
      {/* Morphing Background Blob */}
      <div 
        ref={blobRef}
        className="absolute inset-0 bg-accent"
        style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
        aria-hidden="true"
      />
      
      {/* Logo SVG */}
      <svg
        ref={svgRef}
        viewBox="0 0 100 80"
        width="40"
        height="32"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#F2F0EB] relative z-10"
        aria-label="HB Logo"
      >
        <path d="M 15 15 L 15 65" className="opacity-0" />
        <path d="M 45 15 L 45 65" className="opacity-0" />
        <path d="M 15 40 L 45 40" className="opacity-0" />
        <path d="M 65 15 L 65 65" className="opacity-0" />
        <path d="M 65 15 C 90 15, 90 40, 65 40" className="opacity-0" />
        <path d="M 65 40 C 95 40, 95 65, 65 65" className="opacity-0" />
      </svg>
    </div>
  );
}
