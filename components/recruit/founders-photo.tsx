import Image from "next/image";
import { motion } from "framer-motion";

const FOUNDERS_IMAGE = "/images/founders.png";

const imageAnchor =
  "absolute bottom-0 left-1/2 aspect-[1024/682] w-full -translate-x-1/2";

const handShadow =
  "[filter:drop-shadow(0_16px_20px_rgba(15,23,42,0.28))_drop-shadow(0_5px_8px_rgba(15,23,42,0.16))]";

export function FoundersPhoto() {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-[400px] overflow-visible"
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="relative overflow-visible pt-14 pb-1">
        <div className="relative aspect-[3/4] w-full overflow-visible">
          <div className="pointer-events-none absolute inset-x-0 -top-12 bottom-0 z-30 overflow-visible">
            <div className={`${imageAnchor} h-[118%]`}>
              <Image
                src={FOUNDERS_IMAGE}
                alt=""
                fill
                className={`object-contain object-bottom ${handShadow}`}
                style={{
                  clipPath:
                    "polygon(0% 0%, 47% 0%, 37% 36%, 9% 46%, 0% 30%)",
                }}
                sizes="(max-width: 768px) 90vw, 400px"
              />
              <Image
                src={FOUNDERS_IMAGE}
                alt=""
                fill
                className={`object-contain object-bottom ${handShadow}`}
                style={{
                  clipPath:
                    "polygon(53% 0%, 100% 0%, 100% 30%, 91% 46%, 63% 36%)",
                }}
                sizes="(max-width: 768px) 90vw, 400px"
              />
            </div>
          </div>

          <div className="relative z-10 h-full w-full overflow-hidden rounded-[1.75rem] border border-red-100 bg-white shadow-[0_18px_40px_rgba(217,43,52,0.12)]">
            <div className={`${imageAnchor} h-[118%]`}>
              <Image
                src={FOUNDERS_IMAGE}
                alt="けーさんとたろー"
                fill
                className="object-contain object-bottom"
                sizes="(max-width: 768px) 90vw, 400px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
