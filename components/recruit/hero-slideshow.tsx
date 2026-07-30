"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

type HeroSlideshowProps = {
  images: readonly string[];
};

const SLIDE_DURATION_MS = 4000;
const FADE_DURATION_MS = 2000;

export function HeroSlideshow({ images }: HeroSlideshowProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const motionEnabled = prefersReducedMotion === false;

  useEffect(() => {
    if (!motionEnabled || images.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, SLIDE_DURATION_MS);

    return () => window.clearInterval(timer);
  }, [images.length, motionEnabled]);

  return (
    <div className="absolute inset-0 bg-white">
      {images.map((src, index) => {
        const isActive = prefersReducedMotion ? index === 0 : index === activeIndex;

        return (
          <div
            key={src}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity ease-in-out ${
              isActive ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
            style={{ transitionDuration: `${FADE_DURATION_MS}ms` }}
          >
            <Image
              src={src}
              alt={`LINE REFORM SUPPORT 採用イメージ ${index + 1}`}
              fill
              priority={index < 2}
              sizes="100vw"
              className="object-contain object-center"
            />
          </div>
        );
      })}
    </div>
  );
}
