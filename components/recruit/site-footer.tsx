import Image from "next/image";
import { recruitSite } from "@/lib/recruit-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 px-4 pt-10 pb-36 md:px-8 md:pb-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Image
              src="/images/logo-reform-support.png"
              alt={recruitSite.company}
              width={144}
              height={64}
              className="h-12 w-auto"
            />
            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500">
              本ページは {recruitSite.company}
              の採用サイトです。LINEから気軽に応募・問い合わせできます。
            </p>
          </div>
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} {recruitSite.company}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
