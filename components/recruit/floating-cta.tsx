"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { LineCtaButton } from "@/components/recruit/line-cta-button";

export function FloatingCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ y: 96, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 96, opacity: 0 }}
          transition={{ duration: 0.28 }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white/95 px-4 py-3 shadow-[0_-8px_32px_rgba(0,0,0,0.08)] backdrop-blur-xl md:hidden"
        >
          <LineCtaButton
            label="LINEで無料相談する"
            sublabel="応募前の質問だけでも大丈夫です"
            location="floating-mobile"
            fullWidth
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
