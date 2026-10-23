# 模怪獸 MOGUMOLD 一頁式網站

客製化矽膠模具開發（2026-10 由原「Hank 藝術模具」改版為新品牌；repo、Vercel 專案、DB schema 名稱仍沿用 `hank`）。

Next.js 15 + Supabase。

## 網址

- Production：https://hank-gamma.vercel.app

## 部署

- Vercel 專案 `hank`（team Armand's projects），已綁 GitHub `Gathertaiwan-Group/hank`。
- **push `main` 即自動部署 production**；其他分支產生 preview。
- Serverless region：`hnd1`（勿改 `hkg1`）。
- 環境變數：`NEXT_PUBLIC_SUPABASE_URL`、`NEXT_PUBLIC_SUPABASE_ANON_KEY`（production / preview / development）。

## 資料庫

- 資料放在 Supabase 專案 `ozwftlkgqmewtadypsfi`（RealReal 庫）的 **`hank` schema**，屬寄居性質。
- **勿使用 `supabase db push`**（會動到 RealReal 的 public schema / migration 歷史）。schema 變更請手動以 SQL 套用到 `hank` schema。
- 前端讀取 `hank.works`（讀取失敗時回退 `content/works.json`），LINE 點擊寫入 `hank.line_clicks`。

## 品牌素材

- 色票：怪獸黃 `#F5C928`、深石墨藍 `#202A35`、暖白 `#F7F5EF`（`app/globals.css` 的 `:root` tokens）。黃色不可當淺底上的文字色。
- `public/brand/logo-header.png`：去背橫式 logo（不含副標），header 用；`public/brand/mark.png`：怪獸頭像去背；`public/brand/og.png`：社群分享圖。
- `app/icon.png` / `app/apple-icon.png`：黃底怪獸 favicon。
- 字型：標題 Chiron GoRound TC 700（圓體）、內文 Noto Sans TC、手寫標語 Caveat，皆為子集；改文案後跑 `node scripts/subset-fonts.mjs`。
