import type { Metadata } from "next";
import Script from "next/script";
import { Noto_Sans_JP, Oswald } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { recruitSite } from "@/lib/recruit-data";

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://line-reform-support-recruit-lp.vercel.app"),
  title: `${recruitSite.company} 採用LP`,
  description:
    "LINE REFORM SUPPORTの採用LP。未経験から現場を支えるプロへ。LINEから気軽に応募・相談できます。",
  openGraph: {
    title: `${recruitSite.company} 採用LP`,
    description:
      "人生を変える仕事を、ここから。LINE REFORM SUPPORTの採用LP。",
    images: ["/images/team.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSansJp.variable} ${oswald.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${recruitSite.gaId}`}
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${recruitSite.gaId}');
          `}
        </Script>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
