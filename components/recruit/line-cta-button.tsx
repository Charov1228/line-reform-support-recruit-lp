"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { recruitSite } from "@/lib/recruit-data";
import { trackLineClick } from "@/lib/gtag";

type LineCtaButtonProps = {
  label?: string;
  sublabel?: string;
  className?: string;
  fullWidth?: boolean;
  location?: string;
};

export function LineCtaButton({
  label = "LINEで応募・相談する",
  sublabel,
  className = "",
  fullWidth = false,
  location = "unknown",
}: LineCtaButtonProps) {
  return (
    <div className={fullWidth ? "w-full" : ""}>
      <Link
        href={recruitSite.lineUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackLineClick(location)}
        className={`group inline-flex items-center justify-center gap-3 rounded-full bg-[#06C755] px-6 py-4 text-sm font-bold text-white shadow-[0_18px_40px_rgba(6,199,85,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(6,199,85,0.36)] md:px-8 md:text-base ${
          fullWidth ? "flex w-full" : ""
        } ${className}`}
      >
        <Image
          src="/images/line-logo.png"
          alt=""
          width={20}
          height={20}
          className="size-5"
        />
        <span>{label}</span>
        <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
      {sublabel ? (
        <p className="mt-2 text-center text-xs text-gray-500">{sublabel}</p>
      ) : null}
    </div>
  );
}
