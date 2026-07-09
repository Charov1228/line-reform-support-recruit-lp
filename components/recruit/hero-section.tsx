"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { recruitSite } from "@/lib/recruit-data";
import { LineCtaButton } from "@/components/recruit/line-cta-button";
import { Marquee } from "@/components/recruit/marquee";

type HeroSectionProps = {
  introComplete?: boolean;
};

const heroEase = [0.22, 1, 0.36, 1] as const;

const headlineContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.25 },
  },
};

const headlineLine = {
  hidden: {
    opacity: 0,
    y: 72,
    scale: 0.96,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.05, ease: heroEase },
  },
};

const heroMeta = {
  hidden: { opacity: 0, x: -36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: heroEase },
  },
};

const heroSupport = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: heroEase },
  },
};

const heroActions = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: heroEase },
  },
};

export function HeroSection({ introComplete = true }: HeroSectionProps) {
  const show = introComplete;

  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        {recruitSite.hero.videoSrc ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={recruitSite.hero.poster}
          >
            <source src={recruitSite.hero.videoSrc} type="video/mp4" />
          </video>
        ) : (
          <>
            <Image
              src={recruitSite.hero.poster}
              alt="LINE REFORM SUPPORT 採用イメージ"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute right-4 bottom-28 rounded-full border border-white/15 bg-black/55 px-4 py-2 text-xs tracking-[0.3em] text-white/75 uppercase md:right-8 md:bottom-32">
              {recruitSite.hero.placeholderLabel}
            </div>
          </>
        )}
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.22),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0.48),rgba(0,0,0,0.72)_38%,rgba(0,0,0,0.88)_100%)]" />
      <motion.div
        aria-hidden
        className="absolute -top-16 -left-8 h-56 w-56 rounded-full bg-red-600/20 blur-3xl"
        animate={{ y: [0, 18, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute right-0 bottom-32 h-72 w-72 rounded-full bg-red-400/10 blur-3xl"
        animate={{ y: [0, -18, 0], x: [0, -14, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pt-24 pb-28 md:px-8 md:pt-28 md:pb-32">
        <div className="max-w-5xl">
          <motion.p
            className="text-sm font-semibold tracking-[0.4em] text-red-300 uppercase"
            initial="hidden"
            animate={show ? "visible" : "hidden"}
            variants={heroMeta}
          >
            {recruitSite.topLead.eyebrow}
          </motion.p>

          <motion.h1
            className="mt-5 text-[1.9rem] font-black leading-[1.1] tracking-tight text-white [text-shadow:0_8px_30px_rgba(0,0,0,0.38)] sm:text-[2.65rem] md:mt-8 md:text-[5.25rem]"
            initial="hidden"
            animate={show ? "visible" : "hidden"}
            variants={headlineContainer}
          >
            {recruitSite.hero.headline.map((line) => (
              <motion.span key={line} className="block" variants={headlineLine}>
                {line}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div
            className="mt-8 max-w-2xl"
            initial="hidden"
            animate={show ? "visible" : "hidden"}
            variants={heroSupport}
            transition={{ delay: 0.72 }}
          >
            <p className="text-base font-medium text-red-100 md:text-lg">
              {recruitSite.topLead.title}
            </p>
            <p className="mt-3 text-sm leading-7 text-white/72 md:text-base md:leading-8">
              {recruitSite.topLead.description}
            </p>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:items-center"
            initial="hidden"
            animate={show ? "visible" : "hidden"}
            variants={heroActions}
            transition={{ delay: 0.95 }}
          >
            <LineCtaButton
              label="LINEで無料相談する"
              sublabel="応募前の質問だけでも大丈夫です"
              location="hero-primary"
            />
            <a
              href="#requirements"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-4 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/10"
            >
              募集要項を見る
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20">
        <Marquee items={recruitSite.hero.englishCopy} />
      </div>
    </section>
  );
}
