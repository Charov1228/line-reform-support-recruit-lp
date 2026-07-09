"use client";

import Image from "next/image";
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
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,43,52,0.28),transparent_58%)]"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="relative flex flex-col items-center px-6 text-center">
        <motion.div
          className="rounded-[2rem] bg-white px-8 py-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] md:px-10 md:py-8"
          initial={{ opacity: 0, scale: 0.88, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/images/logo-reform-support.png"
            alt={recruitSite.company}
            width={220}
            height={96}
            priority
            className="h-16 w-auto md:h-20"
          />
        </motion.div>
        <motion.p
          className="mt-6 text-xs font-semibold tracking-[0.45em] text-red-300 uppercase md:text-sm"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          Recruit
        </motion.p>
        <motion.p
          className="mt-4 text-sm leading-8 text-white/65 md:text-base"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          {recruitSite.hero.headline.join("")}
        </motion.p>
      </div>
    </motion.div>
  );
}
