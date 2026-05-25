"use client";

import { useEffect, useState } from "react";
import AnimatedHeroText from "./AnimatedHeroText";

export default function Hero() {
  const [showMainHero, setShowMainHero] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMainHero(true);
    }, 5000); // ⬅️ 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero">
      {!showMainHero && (
        <div className="intro">
          <AnimatedHeroText />
        </div>
      )}

      {showMainHero && (
        <HeroMain />
      )}
        

    </section>
  );
}