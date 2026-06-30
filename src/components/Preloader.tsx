"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [phase, setPhase] = useState<"hidden" | "visible" | "fade">("hidden");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Phase 0 -> 1: Logo fades and scales in
    const timer0 = setTimeout(() => {
      setPhase("visible");
    }, 100);

    // Phase 1 -> 2: Start fade-out after 2.5s (stays for 2.4s)
    const timer1 = setTimeout(() => {
      setPhase("fade");
    }, 2500);

    // Phase 2 -> done: Remove from DOM after fade
    const timer2 = setTimeout(() => {
      setLoading(false);
    }, 3100);

    return () => {
      clearTimeout(timer0);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-600 ease-in-out ${
        phase === "fade" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div
        className={`transition-all duration-700 ease-out ${
          phase === "hidden"
            ? "scale-90 opacity-0"
            : phase === "fade"
            ? "scale-105 opacity-0"
            : "scale-100 opacity-100"
        }`}
      >
        <img
          src="/logo-white-text.png"
          alt="Colortechnik Logo"
          className="w-48 md:w-64 h-auto"
        />
      </div>
    </div>
  );
}
