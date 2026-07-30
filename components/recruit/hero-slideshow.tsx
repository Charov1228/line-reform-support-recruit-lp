"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type HeroSlideshowProps = {
  images: readonly string[];
  playing?: boolean;
};

const SLIDE_DURATION_MS = 3000;
const FADE_DURATION_S = 1;

export function HeroSlideshow({
  images,
  playing = true,
}: HeroSlideshowProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!playing || prefersReducedMotion || images.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, SLIDE_DURATION_MS);

    return () => window.clearInterval(timer);
  }, [images.length, playing, prefersReducedMotion]);

  return (
    <div className="absolute inset-0 bg-black">
      {images.map((src, index) => {
        const isActive = prefersReducedMotion ? index === 0 : index === activeIndex;

        return (
          <motion.div
            key={src}
            className="absolute inset-0"
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: FADE_DURATION_S, ease: "easeInOut" }}
            aria-hidden={!isActive}
          >
            <Image
              src={src}
              alt={`LINE REFORM SUPPORT 採用イメージ ${index + 1}`}
              fill
              priority={index < 2}
              sizes="100vw"
              className="object-contain object-center"
            />
          </motion.div>
        );
      })}
    </div>
  );
}
