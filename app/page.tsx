import { HeroSection } from "@/components/recruit/hero-section";
import { SiteHeader } from "@/components/recruit/site-header";
import { FloatingCta } from "@/components/recruit/floating-cta";
import { SiteFooter } from "@/components/recruit/site-footer";
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

export default function Home() {
  return (
    <>
      <SiteHeader />
      <FloatingCta />
      <main className="overflow-x-hidden bg-white text-gray-900">
        <HeroSection />
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
