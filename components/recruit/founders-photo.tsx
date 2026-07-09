import Image from "next/image";
import { motion } from "framer-motion";

const FRAME_IMAGE = "/images/founders.jpg";
const HANDS_IMAGE = "/images/founders-hands.png";

const sharedPlacement =
  "absolute left-1/2 top-[-11%] h-[122%] w-[105%] max-w-none -translate-x-1/2 object-cover object-[center_34%]";

export function FoundersPhoto() {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-[420px] overflow-visible pt-10"
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="relative aspect-[3/4] w-full overflow-visible">
        <div className="absolute inset-0 z-[2] overflow-hidden rounded-[1.75rem] border border-red-100 bg-black shadow-md">
          <Image
            src={FRAME_IMAGE}
            alt="けーさんとたろー"
            width={1024}
            height={682}
            className={sharedPlacement}
            sizes="(max-width: 768px) 90vw, 420px"
            priority
          />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[3] overflow-visible"
        >
          <Image
            src={HANDS_IMAGE}
            alt=""
            width={1024}
            height={682}
            className={sharedPlacement}
            sizes="(max-width: 768px) 90vw, 420px"
          />
        </div>
      </div>
    </motion.div>
  );
}
