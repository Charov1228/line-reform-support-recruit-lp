"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type HeroSlideshowProps = {
  images: readonly string[];
};

const SLIDE_DURATION_MS = 4000;
const FADE_DURATION_MS = 2000;
const MOBILE_SCROLL_DURATION_S = 80;

function MobileScrollTrack({
  images,
  trackId,
}: {
  images: readonly string[];
  trackId: string;
}) {
  return (
    <div className="flex h-full shrink-0 items-center">
      {images.map((src, index) => (
        <div
          key={`${trackId}-${src}`}
          className="relative h-full w-screen shrink-0"
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
      ))}
    </div>
  );
}

function MobileHeroSlideshow({ images }: HeroSlideshowProps) {
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
          sizes="100vw"
          className="h-auto w-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <motion.div
        className="flex h-full w-max will-change-transform"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: MOBILE_SCROLL_DURATION_S,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <MobileScrollTrack images={images} trackId="a" />
        <MobileScrollTrack images={images} trackId="b" />
      </motion.div>
    </div>
  );
}

function DesktopHeroSlideshow({ images }: HeroSlideshowProps) {
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
    <>
      {images.map((src, index) => {
        const isActive = prefersReducedMotion ? index === 0 : index === activeIndex;

        return (
          <div
            key={src}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity ease-in-out ${
              isActive ? "z-[1] opacity-100" : "z-0 opacity-0"
            }`}
            style={{ transitionDuration: `${FADE_DURATION_MS}ms` }}
          >
            <Image
              src={src}
              alt={`LINE REFORM SUPPORT 採用イメージ ${index + 1}`}
              fill
              priority={index < 2}
              sizes="(max-width: 177.78dvh) 100vw, 177.78dvh"
              className="object-cover object-center"
            />
          </div>
        );
      })}
    </>
  );
}

export function HeroSlideshow({ images }: HeroSlideshowProps) {
  return (
    <>
      <div className="absolute inset-0 md:hidden">
        <MobileHeroSlideshow images={images} />
      </div>
      <div className="absolute inset-0 hidden md:block">
        <DesktopHeroSlideshow images={images} />
      </div>
    </>
  );
}
