"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { recruitSite } from "@/lib/recruit-data";

type OpeningIntroProps = {
  onComplete: () => void;
};

export function OpeningIntro({ onComplete }: OpeningIntroProps) {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, 3400);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#050505]"
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{
        delay: 2.4,
        duration: 0.95,
        ease: [0.76, 0, 0.24, 1],
      }}
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,43,52,0.35),transparent_62%)]"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        aria-hidden
        className="absolute top-1/2 h-px w-0 bg-red-500"
        initial={{ width: 0, x: "-50%" }}
        animate={{ width: "min(72vw, 520px)", x: "-50%" }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        style={{ left: "50%" }}
      />
      <div className="relative px-6 text-center">
        <motion.p
          className="text-xs font-semibold tracking-[0.55em] text-red-400 uppercase md:text-sm"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {recruitSite.company}
        </motion.p>
        <motion.h1
          className="mt-5 font-heading text-4xl font-bold tracking-[0.18em] text-white uppercase md:text-6xl"
          initial={{ opacity: 0, y: 36, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          Recruit
        </motion.h1>
        <motion.p
          className="mt-6 text-sm leading-8 text-white/65 md:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          {recruitSite.hero.headline.join("")}
        </motion.p>
      </div>
    </motion.div>
  );
}
