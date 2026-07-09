"use client";

import { motion } from "framer-motion";

type MarqueeProps = {
  items: readonly string[];
  className?: string;
};

export function Marquee({ items, className = "" }: MarqueeProps) {
  const track = (
    <div className="flex shrink-0 items-center">
      {Array.from({ length: 8 }).map((_, index) =>
        items.map((item) => (
          <span
            key={`${item}-${index}`}
            className="mx-10 inline-flex shrink-0 items-center whitespace-nowrap text-sm font-semibold tracking-[0.35em] text-white/50 uppercase md:mx-14 md:text-base"
          >
            {item}
          </span>
        )),
      )}
    </div>
  );

  return (
    <div
      className={`overflow-hidden border-y border-white/15 bg-black/40 py-3 backdrop-blur-sm ${className}`}
    >
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {track}
        {track}
      </motion.div>
    </div>
  );
}
