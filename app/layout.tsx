import type { Metadata, Viewport } from "next";
import { Noto_Sans_TC } from "next/font/google";
import localFont from "next/font/local";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from "@/lib/site";
import "./globals.css";

/**
 * 字型策略（Lighthouse Mobile Performance）：
 * 1. 先用「只含本站用字」的子集（app/fonts，scripts/subset-fonts.mjs 產生，preload）。
 * 2. 子集缺字時才退回 Google 完整字型的 unicode-range 分片（不 preload，只抓缺字所在分片）。
 * 原本直接用 Google 分片，整頁要抓 ~28 片、約 2.1MB，FCP/LCP 被拖到 11 秒。
 *
 * 標題用圓體 Chiron GoRound TC 700（對齊模怪獸品牌「圓潤厚實」字感）；它不在 next/font/google
 * 清單內，所以標題缺字時退回 Noto Sans TC（見 globals.css 的 --font-display 堆疊）。
 */
const displaySubset = localFont({
  src: [{ path: "./fonts/chiron-goround-tc-700.woff2", weight: "700", style: "normal" }],
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-display-subset",
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

/** 手寫標語「Mogu Your Idea!」：只含這幾個字母，約 7KB，不 preload（在頁尾） */
const hand = localFont({
  src: [{ path: "./fonts/caveat-600.woff2", weight: "600", style: "normal" }],
  display: "swap",
  preload: false,
  variable: "--font-hand",
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
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    images: [{ url: "/brand/og.png", width: 1200, height: 630, alt: "模怪獸 MOGUMOLD 客製化矽膠模具開發" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/brand/og.png"],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F7F5EF",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant-TW" className={`${displaySubset.variable} ${sansSubset.variable} ${hand.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
