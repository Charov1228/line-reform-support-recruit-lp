import { track } from "@vercel/analytics";
import { recruitSite } from "@/lib/recruit-data";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** LINE公式アカウントへのクリックを計測（GA4 + Vercel Analytics） */
export function trackLineClick(location: string) {
  if (typeof window === "undefined") {
    return;
  }

  const payload = {
    location,
    link_url: recruitSite.lineUrl,
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", "line_click", {
      event_category: "engagement",
      event_label: location,
      ...payload,
    });
  }

  track("line_click", payload);
}

export {};
