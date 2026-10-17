#!/usr/bin/env node
/**
 * 產生「只含本站用到的字」的 Noto Serif TC / Noto Sans TC 子集字型（app/fonts/*.woff2）。
 *
 * 為什麼：Google 的 CJK 字型切成上百個 unicode-range 分片，整頁實際會抓 ~28 個分片、約 2.1MB，
 * Lighthouse Mobile 的 FCP/LCP 因此被拖到 11 秒以上。改用子集後約 150KB。
 * 子集缺字時（例如後台新增作品用到新字）會自動退回 layout.tsx 裡的 Google 完整字型分片，
 * 不會破版，只是多下載該字所在的分片 —— 內容改版後重跑本腳本即可再瘦身：
 *
 *   node scripts/subset-fonts.mjs
 *
 * 字集來源：下方 STATIC（各區塊固定文案，依實際字體/字重分組）+ content/works.json + 線上 Supabase 作品（若有 env）。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "app/fonts");

const ASCII = Array.from({ length: 0x7f - 0x20 }, (_, i) => String.fromCharCode(0x20 + i)).join("");
const PUNCT = "，。、；：？！「」『』（）《》〈〉【】—–…→←×·．～＋％＠©";

// 固定文案（依元件實際使用的字體 + 字重分組）
const STATIC = {
  serif900:
    "Hank藝術模具創做屬於你品牌的特色一個，讓與市場徹底區隔想提升競爭力？從法到第01234專為設計師主供「造型開發」業團隊下單前可能知道帶著來我們幫出",
  serif700: "甜點品牌觀光工廠香氛通路飯店禮品部門小量客製創業者",
  sans700:
    "LINE免費諮詢客製化矽膠模具加入@構圖→我們幫您生成作品集服務流程提供想法3D建模樣列印翻交付關於常見問題立即聯繫我也想做這種詢問傳給",
  sans400: "",
};

function sourceChars() {
  // 一般內文（Sans 400）涵蓋所有元件與站台文案，避免漏字
  const files = [
    ...fs.readdirSync(path.join(root, "components")).map((f) => path.join(root, "components", f)),
    path.join(root, "lib/site.ts"),
  ];
  return files.map((f) => fs.readFileSync(f, "utf8")).join("");
}

async function loadWorks() {
  const works = JSON.parse(fs.readFileSync(path.join(root, "content/works.json"), "utf8"));
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (url && key) {
    try {
      const res = await fetch(`${url}/rest/v1/works?select=cat,title,body&published=eq.true`, {
        headers: { apikey: key, Authorization: `Bearer ${key}`, "Accept-Profile": "hank" },
      });
      if (res.ok) works.push(...(await res.json()));
      else console.warn(`[subset-fonts] Supabase ${res.status}, 只用 works.json`);
    } catch (e) {
      console.warn("[subset-fonts] Supabase 讀取失敗，只用 works.json:", e.message);
    }
  }
  return works;
}

const uniq = (s) => [...new Set([...s].filter((c) => c.trim() && (c.codePointAt(0) ?? 0) >= 0x20))].join("");
const cjkOnly = (s) => [...s].filter((c) => (c.codePointAt(0) ?? 0) >= 0x2000).join("");

const works = await loadWorks();
const titles = works.map((w) => w.title).join("");
const cats = works.map((w) => w.cat).join("");
const bodies = works.map((w) => w.body).join("");

const faces = [
  { file: "noto-serif-tc-900.woff2", family: "Noto Serif TC", wght: 900, text: STATIC.serif900 + titles },
  { file: "noto-serif-tc-700.woff2", family: "Noto Serif TC", wght: 700, text: STATIC.serif700 + titles },
  { file: "noto-sans-tc-700.woff2", family: "Noto Sans TC", wght: 700, text: STATIC.sans700 + cats },
  { file: "noto-sans-tc-400.woff2", family: "Noto Sans TC", wght: 400, text: cjkOnly(sourceChars()) + bodies + titles + cats },
];

// 用現代瀏覽器 UA，Google 才會回 woff2
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36";

fs.mkdirSync(outDir, { recursive: true });
for (const f of faces) {
  const text = uniq(ASCII + PUNCT + f.text);
  const cssUrl =
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(f.family)}:wght@${f.wght}` +
    `&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(cssUrl, { headers: { "User-Agent": UA } })).text();
  const urls = [...css.matchAll(/url\((https:[^)]+)\)/g)].map((m) => m[1]);
  if (urls.length !== 1) throw new Error(`${f.file}: 預期 1 個字型檔，拿到 ${urls.length}\n${css.slice(0, 300)}`);
  const buf = Buffer.from(await (await fetch(urls[0])).arrayBuffer());
  fs.writeFileSync(path.join(outDir, f.file), buf);
  console.log(`${f.file}  ${[...text].length} 字  ${(buf.length / 1024).toFixed(1)} KB`);
}
