"use client";

import { useEffect, useState } from "react";

export default function AnimatedHeroText() {
  const texts = [
    "Your Money Deserves Real Soil.",
    "That's Why We Are Here."
  ];

  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let charIndex = 0;

    const typing = setInterval(() => {
      setDisplayedText(texts[index].slice(0, charIndex + 1));
      charIndex++;

      if (charIndex === texts[index].length) {
        clearInterval(typing);

        setTimeout(() => {
          setDisplayedText("");
          setIndex((prev) => (prev + 1) % texts.length);
        }, 1800);
      }
    }, 70);

    return () => clearInterval(typing);
  }, [index]);

  return (
    <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight max-w-4xl mx-auto">
      {displayedText}
    </h2>
  );
}