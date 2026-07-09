import Image from "next/image";
import { motion } from "framer-motion";

const FOUNDERS_IMAGE = "/images/founders.png";

export function FoundersPhoto() {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-[420px] overflow-visible"
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="relative overflow-visible pb-1 pt-12">
        <div className="relative aspect-[3/4] w-full">
          <div
            aria-hidden
            className="absolute inset-0 rounded-[1.75rem] border border-red-100 bg-white shadow-[0_18px_40px_rgba(217,43,52,0.12)]"
          />

          <div className="absolute -top-[18%] right-0 bottom-0 left-0 z-10 overflow-visible">
            <Image
              src={FOUNDERS_IMAGE}
              alt="けーさんとたろー"
              fill
              className="object-contain object-bottom [filter:drop-shadow(0_14px_22px_rgba(15,23,42,0.2))]"
              sizes="(max-width: 768px) 92vw, 420px"
              priority
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
