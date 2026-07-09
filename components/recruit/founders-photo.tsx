import Image from "next/image";
import { motion } from "framer-motion";

const FOUNDERS_IMAGE = "/images/founders.png";

// Original founders card ratio (854 x 856)
const CARD_ASPECT = "854 / 856";
// Space for raised hands above the card (matched top/bottom for visual balance)
const HAND_OVERFLOW = "10%";

export function FoundersPhoto() {
  return (
    <motion.div
      className="relative w-full overflow-visible"
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        className="relative overflow-visible"
        style={{
          paddingTop: HAND_OVERFLOW,
          paddingBottom: HAND_OVERFLOW,
        }}
      >
        <div
          className="relative w-full overflow-visible"
          style={{ aspectRatio: CARD_ASPECT }}
        >
          <div
            aria-hidden
            className="absolute inset-0 z-0 rounded-[1.75rem] border border-red-100 bg-white shadow-[0_18px_40px_rgba(217,43,52,0.12)]"
          />

          <div className="absolute bottom-0 left-1/2 z-10 aspect-[1024/682] w-[195%] max-w-none -translate-x-1/2 overflow-visible">
            <Image
              src={FOUNDERS_IMAGE}
              alt="けーさんとたろー"
              fill
              className="object-contain object-bottom [filter:drop-shadow(0_16px_24px_rgba(15,23,42,0.22))]"
              sizes="(max-width: 768px) 92vw, 520px"
              priority
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
