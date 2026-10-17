import type { Metadata, Viewport } from "next";
import { Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";
import localFont from "next/font/local";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site";
import "./globals.css";

/**
 * 字型策略（Lighthouse Mobile Performance）：
 * 1. 先用「只含本站用字」的子集（app/fonts，scripts/subset-fonts.mjs 產生，合計約 180KB，preload）。
 * 2. 子集缺字時才退回 Google 完整字型的 unicode-range 分片（不 preload，只抓缺字所在分片）。
 * 原本直接用 Google 分片，整頁要抓 ~28 片、約 2.1MB，FCP/LCP 被拖到 11 秒。
 */
const serifSubset = localFont({
  src: [
    { path: "./fonts/noto-serif-tc-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/noto-serif-tc-900.woff2", weight: "900", style: "normal" },
  ],
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-serif-subset",
});

const sansSubset = localFont({
  src: [
    { path: "./fonts/noto-sans-tc-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/noto-sans-tc-700.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-sans-subset",
});

const serif = Noto_Serif_TC({
  weight: ["700", "900"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  variable: "--font-serif-full",
});

const sans = Noto_Sans_TC({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  variable: "--font-sans-full",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    siteName: "Hank 藝術模具",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    images: [{ url: "/images/hero.jpeg", width: 1024, height: 1024, alt: "客製化矽膠模具" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/hero.jpeg"],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F6F1EA",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant-TW" className={`${serifSubset.variable} ${sansSubset.variable} ${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
