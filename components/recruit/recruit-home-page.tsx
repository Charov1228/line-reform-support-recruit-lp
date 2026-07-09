"use client";

import { useEffect, useState } from "react";
import { HeroSection } from "@/components/recruit/hero-section";
import { SiteHeader } from "@/components/recruit/site-header";
import { FloatingCta } from "@/components/recruit/floating-cta";
import { SiteFooter } from "@/components/recruit/site-footer";
import { OpeningIntro } from "@/components/recruit/opening-intro";
import {
  AboutSection,
  AppealSection,
  BeginnerSection,
  CommentsSection,
  CtaBannerSection,
  FaqSection,
  FinalCtaSection,
  FlowSection,
  FoundersSection,
  JobsRequirementsSection,
} from "@/components/recruit/content-sections";

export function RecruitHomePage() {
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const navigation = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;

    if (navigation?.type === "reload" && window.location.hash) {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }

    window.scrollTo(0, 0);

    return () => {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "auto";
      }
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = introComplete ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [introComplete]);

  useEffect(() => {
    if (introComplete) {
      window.scrollTo(0, 0);
    }
  }, [introComplete]);

  const handleIntroComplete = () => {
    setIntroComplete(true);
  };

  return (
    <>
      {!introComplete ? <OpeningIntro onComplete={handleIntroComplete} /> : null}
      <SiteHeader />
      <FloatingCta />
      <main className="overflow-x-hidden bg-white text-gray-900">
        <HeroSection introComplete={introComplete} />
        <CtaBannerSection />
        <FoundersSection />
        <AboutSection />
        <JobsRequirementsSection />
        <AppealSection />
        <BeginnerSection />
        <CommentsSection />
        <FlowSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
