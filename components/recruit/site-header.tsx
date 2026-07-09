"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LineCtaButton } from "@/components/recruit/line-cta-button";

const navItems = [
  { href: "#founders", label: "けーさんとたろー" },
  { href: "#about", label: "私たちについて" },
  { href: "#requirements", label: "募集要項" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
        scrolled
          ? "border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-xl"
          : "bg-white/90 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 md:px-8 md:py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo-reform-support.png"
            alt="LINE REFORM SUPPORT"
            width={132}
            height={58}
            className="h-10 w-auto md:h-12"
            priority
          />
          <div className="hidden md:block">
            <p className="text-[11px] tracking-[0.32em] text-gray-400 uppercase">
              Recruit
            </p>
            <p className="text-sm font-semibold text-gray-900">
              LINE REFORM SUPPORT
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-gray-600 transition hover:text-red-600"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <LineCtaButton
            label="LINEで無料相談する"
            location="header"
            className="px-5 py-3 text-sm"
          />
        </div>
      </div>
    </header>
  );
}
