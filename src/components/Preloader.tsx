"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [phase, setPhase] = useState<"hidden" | "icon_in" | "text_in" | "fade_out">("hidden");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Icon fades in from left immediately
    const timer0 = setTimeout(() => {
      setPhase("icon_in");
    }, 100);

    // 2. Text fades in after 2.4 seconds
    const timer1 = setTimeout(() => {
      setPhase("text_in");
    }, 2500);

    // 3. Everything fades out after another 2 seconds (total 4.5s)
    const timer2 = setTimeout(() => {
      setPhase("fade_out");
    }, 4500);

    // 4. Remove preloader from DOM at 5 seconds
    const timer3 = setTimeout(() => {
      setLoading(false);
    }, 5100);

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
        phase === "fade_out" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div 
        className={`flex flex-col items-center gap-6 transition-transform duration-700 ease-out ${
          phase === "fade_out" ? "scale-105" : "scale-100"
        }`}
      >
        {/* The CT Icon - Slides in from left */}
        <img
          src="/preloader-icon.png"
          alt="Colortechnik Icon"
          className={`w-32 md:w-48 h-auto transition-all duration-1000 ease-out transform ${
            phase === "hidden"
              ? "-translate-x-12 opacity-0"
              : "translate-x-0 opacity-100"
          }`}
        />

        {/* The Text - Fades in later */}
        <img
          src="/preloader-text.png"
          alt="Colortechnik Text"
          className={`w-48 md:w-64 h-auto transition-opacity duration-1000 ease-in ${
            phase === "text_in" || phase === "fade_out"
              ? "opacity-100"
              : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
}
