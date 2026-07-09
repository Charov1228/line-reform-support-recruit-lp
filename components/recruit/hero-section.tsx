"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { recruitSite } from "@/lib/recruit-data";
import { LineCtaButton } from "@/components/recruit/line-cta-button";
import { Marquee } from "@/components/recruit/marquee";

type HeroSectionProps = {
  introComplete?: boolean;
};

export function HeroSection({ introComplete = true }: HeroSectionProps) {
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
        <motion.div
          className="max-w-5xl"
          initial={{ opacity: 0, y: 32 }}
          animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.9, delay: introComplete ? 0.15 : 0, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-semibold tracking-[0.4em] text-red-300 uppercase">
            {recruitSite.topLead.eyebrow}
          </p>
          <h1 className="mt-5 text-[2.65rem] font-black leading-[1.05] tracking-tight text-white [text-shadow:0_8px_30px_rgba(0,0,0,0.38)] md:mt-8 md:text-[5.25rem]">
            {recruitSite.hero.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <div className="mt-8 max-w-2xl">
            <p className="text-base font-medium text-red-100 md:text-lg">
              {recruitSite.topLead.title}
            </p>
            <p className="mt-3 text-sm leading-7 text-white/72 md:text-base md:leading-8">
              {recruitSite.topLead.description}
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
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
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20">
        <Marquee items={recruitSite.hero.englishCopy} />
      </div>
    </section>
  );
}
