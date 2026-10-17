# Hank 藝術模具一頁式網站

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
