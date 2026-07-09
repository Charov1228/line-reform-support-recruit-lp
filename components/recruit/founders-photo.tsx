import Image from "next/image";
import { motion } from "framer-motion";

const FRAME_IMAGE = "/images/founders-white.jpg";
const HANDS_IMAGE = "/images/founders-hands.png";

const photoPlacement =
  "absolute left-1/2 aspect-[1024/682] w-[118%] max-w-none -translate-x-1/2";

export function FoundersPhoto() {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-[440px] overflow-visible"
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="relative overflow-visible px-1 pt-16 pb-2">
        <div className="relative aspect-[3/4] w-full overflow-visible">
          <div
            aria-hidden
            className={`pointer-events-none top-[-24%] z-30 ${photoPlacement} h-[64%] overflow-visible`}
          >
            <Image
              src={HANDS_IMAGE}
              alt=""
              fill
              className="scale-[1.06] object-cover object-top [filter:drop-shadow(0_18px_22px_rgba(15,23,42,0.3))_drop-shadow(0_6px_10px_rgba(15,23,42,0.18))]"
              sizes="(max-width: 768px) 95vw, 440px"
            />
          </div>

          <div className="relative z-10 h-full w-full overflow-hidden rounded-[1.75rem] border border-red-100 bg-white shadow-[0_20px_48px_rgba(217,43,52,0.14)]">
            <div className={`top-[-14%] ${photoPlacement} h-[148%]`}>
              <Image
                src={FRAME_IMAGE}
                alt="けーさんとたろー"
                fill
                className="object-cover object-[center_36%]"
                sizes="(max-width: 768px) 92vw, 440px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
