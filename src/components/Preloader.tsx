"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [phase, setPhase] = useState<"hidden" | "logo" | "full" | "fade">("hidden");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Phase 1: Logo icon fades in (0s to 2.4s)
    const timer0 = setTimeout(() => {
      setPhase("logo");
    }, 100);

    // Phase 2: Text and strip fade in (2.4s to 4.4s)
    const timer1 = setTimeout(() => {
      setPhase("full"); 
    }, 2400);

    // Phase 3: Everything fades out after staying together for 2s (total 4.4s)
    const timer2 = setTimeout(() => {
      setPhase("fade");
    }, 4400);

    // Phase 4: Remove from DOM at 5s total length
    const timer3 = setTimeout(() => {
      setLoading(false);
    }, 5000);

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
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-600 ease-in-out ${
        phase === "fade" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-4 md:gap-6">
        {/* The Icon (First picture) */}
        <img
          src="/preloader-icon.png"
          alt="Colortechnik Logo Icon"
          className={`w-48 md:w-72 h-auto transition-all duration-1000 ease-in-out ${
            phase !== "hidden" ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        />
        
        {/* The Text & Strip (Second picture) */}
        <img
          src="/preloader-text.png"
          alt="Colortechnik Logo Text"
          className={`w-64 md:w-96 h-auto transition-opacity duration-1000 ease-in-out ${
            phase === "full" || phase === "fade" ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
}
