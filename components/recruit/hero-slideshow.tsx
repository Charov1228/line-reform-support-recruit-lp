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
    <div className="flex h-full shrink-0 items-center">
      {images.map((src, index) => (
        <Image
          key={`${trackId}-${src}`}
          src={src}
          alt={`LINE REFORM SUPPORT 採用イメージ ${index + 1}`}
          width={1024}
          height={576}
          priority={index < 2}
          sizes="100vh"
          className="h-full w-auto max-w-none shrink-0"
        />
      ))}
    </div>
  );
}

export function HeroSlideshow({ images }: HeroSlideshowProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black">
        <Image
          src={images[0]}
          alt="LINE REFORM SUPPORT 採用イメージ"
          width={1024}
          height={576}
          priority
          sizes="100vh"
          className="h-full w-auto max-w-none"
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
