"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type HeroSlideshowProps = {
  images: readonly string[];
};

function SlideshowTrack({
  images,
  trackId,
}: {
  images: readonly string[];
  trackId: string;
}) {
  return (
    <div className="flex h-full shrink-0 items-stretch">
      {images.map((src, index) => (
        <div
          key={`${trackId}-${src}`}
          className="relative h-full w-[92vw] shrink-0 sm:w-[80vw] md:w-[62vw] lg:w-[55vw]"
        >
          <Image
            src={src}
            alt={`LINE REFORM SUPPORT 採用イメージ ${index + 1}`}
            fill
            priority={index < 2}
            sizes="(max-width: 640px) 92vw, (max-width: 768px) 80vw, (max-width: 1024px) 62vw, 55vw"
            className="object-cover object-center scale-[1.08] sm:scale-105 md:scale-100"
          />
        </div>
      ))}
    </div>
  );
}

export function HeroSlideshow({ images }: HeroSlideshowProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0">
        <Image
          src={images[0]}
          alt="LINE REFORM SUPPORT 採用イメージ"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="flex h-full w-max will-change-transform"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
      >
        <SlideshowTrack images={images} trackId="a" />
        <SlideshowTrack images={images} trackId="b" />
      </motion.div>
    </div>
  );
}
