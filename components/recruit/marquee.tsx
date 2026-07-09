"use client";

import { motion } from "framer-motion";

type MarqueeProps = {
  items: readonly string[];
};

export function Marquee({ items }: MarqueeProps) {
  const content = [...items, ...items, ...items];

  return (
    <div className="overflow-hidden border-y border-white/10 bg-black/30 py-3">
      <motion.div
        className="flex w-max gap-8 whitespace-nowrap text-xs font-semibold tracking-[0.35em] text-white/35 uppercase md:text-sm"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {content.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </motion.div>
    </div>
  );
}
