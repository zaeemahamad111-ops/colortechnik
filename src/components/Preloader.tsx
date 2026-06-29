"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [phase, setPhase] = useState<"hidden" | "logo" | "full" | "fade">("hidden");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Phase 0 -> 1: Logo slides in from left
    const timer0 = setTimeout(() => {
      setPhase("logo");
    }, 50);

    // Phase 1 -> 2: Reveal name (after 2.0s)
    const timer1 = setTimeout(() => {
      setPhase("full"); 
    }, 2050);

    // Phase 2 -> 3: Show logo + name for 2.2s (total 4.2s), then fade out
    const timer2 = setTimeout(() => {
      setPhase("fade");
    }, 4250);

    // Phase 3 -> 4: Remove from DOM 500ms after fade starts (total 4.75s)
    const timer3 = setTimeout(() => {
      setLoading(false);
    }, 4750);

    return () => {
      clearTimeout(timer0);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-500 ease-in-out ${
        phase === "fade" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div
        className={`relative flex items-center justify-center transition-all duration-1000 ease-out transform ${
          phase === "hidden"
            ? "-translate-x-12 opacity-0"
            : phase === "fade"
            ? "scale-110 opacity-0"
            : "translate-x-0 opacity-100"
        }`}
      >
        {/* Top Image: Logo Icon (Static) */}
        <img
          src="/preloader-logo.png"
          alt="Colortechnik Loading Logo"
          className="w-80 md:w-[450px] h-auto drop-shadow-2xl"
          style={{
            clipPath: "inset(0 0 33% 0)",
          }}
        />
        
        {/* Bottom Image: Text (Animated and Shifted for visual balance) */}
        <img
          src="/preloader-logo.png"
          alt=""
          className="absolute top-0 left-0 w-80 md:w-[450px] h-auto drop-shadow-2xl"
          style={{
            transform: "translateX(-5%)", // Shift text left to perfectly center it under the heavy "C"
            clipPath:
              phase === "hidden" || phase === "logo"
                ? "inset(67% 0 33% 0)"
                : "inset(67% 0 0 0)",
            transition: "clip-path 1s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </div>
    </div>
  );
}

