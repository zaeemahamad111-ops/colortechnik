"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [phase, setPhase] = useState<"hidden" | "logo-in" | "name-in" | "fade-out">("hidden");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 0s: Logo fades in from left to right
    const timer0 = setTimeout(() => {
      setPhase("logo-in");
    }, 50);

    // 2.4s: Name fades in
    const timer1 = setTimeout(() => {
      setPhase("name-in");
    }, 2400);

    // 4.4s: Total fade out begins
    const timer2 = setTimeout(() => {
      setPhase("fade-out");
    }, 4400);

    // 5.0s: Remove from DOM
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
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-500 ease-in-out ${
        phase === "fade-out" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center relative w-48 md:w-64">
        {/* Logo Icon (fades in from left) */}
        <img
          src="/logo-icon.png"
          alt="Colortechnik Icon"
          className={`w-full h-auto object-contain transition-all duration-1000 ease-out transform ${
            phase === "hidden"
              ? "-translate-x-12 opacity-0"
              : phase === "fade-out"
              ? "scale-105 opacity-0"
              : "translate-x-0 opacity-100"
          }`}
        />
        
        {/* Logo Text (fades in later) */}
        <div className="w-full relative mt-4">
          <img
            src="/logo-text.png"
            alt="Colortechnik Text"
            className={`w-full h-auto object-contain transition-all duration-1000 ease-in-out ${
              phase === "hidden" || phase === "logo-in"
                ? "opacity-0 translate-y-2"
                : phase === "fade-out"
                ? "opacity-0 scale-105"
                : "opacity-100 translate-y-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
