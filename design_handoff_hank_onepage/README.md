# Handoff：Hank 藝術模具 一頁式網站

> **給 Claude Code 的指令（直接貼上）**
> 依照本資料夾，以 **Next.js (App Router) + TypeScript** 重建 `reference/index.dc.html` 的一頁式網站，**視覺與互動 100% 一致**（顏色、字級、間距、斷點、hover、彈窗行為）。作品集資料改從 **Supabase** 讀取（`supabase/schema.sql`），所有 LINE 按鈕點擊寫入 `line_clicks`。程式碼推到 **GitHub**，部署到 **Vercel**。完成後用瀏覽器並排比對 reference 與新站，在 375 / 768 / 1280 px 三個寬度都要一致。

---

## 1. 概覽
客製化矽膠模具品牌的一頁式形象網站。**唯一轉換目標：讓訪客點擊加入 LINE@**（`https://lin.ee/nDPgBOg`）。

## 2. 關於設計檔
- `reference/index.dc.html` 是 HTML 設計稿（可直接用瀏覽器開啟，需同資料夾的 `support.js`）。它是**視覺與行為的唯一真實來源**，但不是要直接上線的程式碼。
- 模板語法說明（讀 reference 時用）：`style="..."` 是 inline CSS；`style-hover="..."` = 該元素 `:hover` 樣式；`<sc-for list="{{works}}" as="w">` = 迴圈；`<sc-if value="{{x}}">` = 條件渲染；`{{ w.title }}` = 資料插值。邏輯在檔案底部 `<script data-dc-script>` 的 `class Component`。
- **重建方式**：把每個區塊的 inline style 原封不動搬成 CSS Module / Tailwind arbitrary value / style 物件皆可，**數值不可改**（包含所有 `clamp()`）。不要套 UI library 預設樣式。

## 3. 擬真度
**High-fidelity**。像素級還原。

## 4. 技術架構
| 項目 | 規格 |
|---|---|
| Framework | Next.js 14+ App Router、TypeScript、Server Component 讀 Supabase |
| 字體 | `next/font/google`：Noto Serif TC (500/700/900)、Noto Sans TC (400/500/700) |
| 圖片 | 先把下方所有圖片下載進 Supabase Storage bucket `works`（或 `/public`），**不要依賴原 webnode CDN** |
| DB | Supabase：`works`（作品集）、`line_clicks`（點擊追蹤），見 `supabase/schema.sql` |
| 部署 | GitHub repo → Vercel；環境變數 `NEXT_PUBLIC_SUPABASE_URL`、`NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| 渲染 | `export const revalidate = 300`（作品更新 5 分鐘內生效）；Supabase 讀取失敗時 fallback 到 `content/works.json` |
| SEO | `<html lang="zh-Hant-TW">`；title「Hank 藝術模具｜客製化矽膠模具」；description 用 Hero 段落文字；OG image 用 Hero 圖 |

建議檔案結構：
```
app/layout.tsx  app/page.tsx  app/globals.css
components/{Header,Hero,ClientStrip,Works,WorkModal,CtaBand,Process,About,Faq,Contact,FloatingLine,LineLink}.tsx
lib/supabase.ts  lib/trackLine.ts  content/works.json
```

## 5. 全域樣式（globals.css）
```css
html{scroll-behavior:smooth}
body{margin:0;background:#F6F1EA;color:#2A211B;font-family:'Noto Sans TC',sans-serif;-webkit-font-smoothing:antialiased}
a{color:#2A211B;text-decoration:none}
a:hover{color:#06A548}
*{box-sizing:border-box}
```
內容容器統一：`max-width:1200px; margin:0 auto; 左右 padding 20px`。

## 6. Design Tokens
**顏色**
| Token | Hex | 用途 |
|---|---|---|
| bg | `#F6F1EA` | 頁面底色、彈窗底 |
| bg-alt | `#EDE4D7` | 關於我們區塊底 |
| img-placeholder | `#E9E0D3` | 作品圖底 |
| ink | `#2A211B` | 主文字、深色區塊底 |
| ink-2 | `#4A3C30` | 內文（about/彈窗）、深底分隔線 |
| ink-3 | `#5A4A3C` | 次要內文 |
| muted | `#7A6A5A` | Logo 英文 |
| muted-dark | `#8C7C6A` | 版權 |
| sand-light | `#CFC2B0` | 深底內文 |
| sand | `#BFAE98` | 深底標籤 |
| line | `#E4DACB` | 分隔線 |
| chip-border | `#D6C8B5` | Hero 標籤框 |
| accent-brown | `#9A5B2E` | 各區 eyebrow 小標 |
| line-green | `#06C755` | LINE 主按鈕 |
| line-green-hover | `#05B04B` | 按鈕 hover |
| link-hover | `#06A548` | 一般連結 hover |
| green-dark | `#0A7A3A` | 白按鈕文字 |
| green-light | `#7FE3A6` | 深底強調字 |
| header-bg | `rgba(246,241,234,0.92)` + `backdrop-filter:blur(10px)` |
| overlay | `rgba(20,15,10,0.7)` |

**字體**：標題 = Noto Serif TC 900；內文 = Noto Sans TC。
**圓角**：圖片 4px、彈窗 6px、按鈕/標籤 999px、浮動鈕 50%。
**陰影**：Hero CTA `0 8px 24px rgba(6,199,85,0.28)`；Contact CTA `0 10px 30px rgba(6,199,85,0.35)`；浮動鈕 `0 8px 24px rgba(0,0,0,0.25)`。
**Eyebrow 小標（每區共用）**：14px / 700 / letter-spacing 0.3em / `#9A5B2E`。

## 7. 區塊規格（由上而下）

### 7.1 Header（sticky, z-index 20）
- 底 `header-bg`，下框 1px `#E4DACB`；內層 padding `12px 20px`，flex 兩端對齊，gap 12px。
- 左 Logo（連 `#top`）：「Hank 藝術模具」Serif 900 20px ls 0.08em；下行「HANK ART MOLDS」11px ls 0.2em `#7A6A5A`；line-height 1.1。
- 右 nav（15px，gap 28px）：**視窗寬 > 820px 才顯示** 作品集 `#works`／服務流程 `#process`／關於我們 `#about`／常見問題 `#faq`。
- LINE 按鈕「LINE 免費諮詢」：`#06C755` 白字 700 14px，padding 10px 18px，pill；hover `#05B04B`。所有寬度都顯示。

### 7.2 Hero `#top`
- grid `repeat(auto-fit, minmax(min(100%,440px),1fr))`，gap `clamp(32px,6vw,56px)`，align center；padding `clamp(32px,6vw,64px) 20px clamp(48px,8vw,80px)`。
- 左欄（flex column gap 24px）：
  - Eyebrow「客製化矽膠模具」
  - H1「創做屬於<br>你品牌的特色」Serif 900 `clamp(40px,6vw,72px)` lh 1.15 ls 0.02em, text-wrap balance
  - 段落 17px lh 1.9 `#5A4A3C` max-width 480px：「從一張手稿、Logo、創意圖案開始，透過 3D 建模、模樣列印與矽膠翻模，一步步將靈感轉化為真實商品。你只要帶著想法，我們就能幫你做出你想要的「第一個模具」。」
  - 標籤列（flex wrap gap 8px）：甜點／冰棒／巧克力／慕斯蛋糕／糖果／肥皂／擴香石 — 1px `#D6C8B5` 框、pill、padding 6px 14px、14px
  - CTA 列（flex wrap gap 16px, margin-top 8px）：主鈕「加入 LINE@ 免費構圖 →」`#06C755` 700 `clamp(16px,4vw,18px)` padding 16px 28px + 綠陰影；次連結「先看作品」→ `#works`，16px，底線 1px `#2A211B` padding-bottom 2px
- 右欄：Hero 圖 aspect-ratio 4/5 cover 圓角 4px；左下疊卡（absolute left 12px bottom 12px）`#2A211B` 底、`#F6F1EA` 字、padding 16px 20px、max-width 240px、14px lh 1.6：「有想法就好 —」換行 **「我們免費幫您生成構圖」**（`#7FE3A6`）。

### 7.3 客戶類型帶
- 全寬 `#2A211B` 底；內層 padding 24px 20px，flex wrap 兩端對齊 gap `12px 40px`。
- 左「合作過的客戶類型」14px ls 0.2em `#BFAE98`；右 Serif 700 `clamp(15px,2vw,18px)` gap `8px 24px`：甜點品牌／觀光工廠／香氛通路／飯店禮品部門／小量客製創業者。

### 7.4 作品集 `#works`
- padding `clamp(56px,10vw,96px) 20px`。
- 標頭（flex wrap 兩端、align flex-end、gap 24px、mb 48px）：Eyebrow「作品集」+ H2「一個模具，<br>讓你與市場徹底區隔」Serif 900 `clamp(30px,4vw,48px)` lh 1.3；右側段落 max-width 420px 16px lh 1.8 `#5A4A3C`：「品牌標誌、圖騰紋樣、角色或主題造型，都能細緻還原。點擊作品看完整介紹。」
- Grid `repeat(auto-fill, minmax(min(100%,160px),1fr))`，gap `clamp(24px,4vw,32px) clamp(14px,3vw,24px)`（手機約 2 欄、桌機 4 欄）。
- 卡片 = `<button>`（無預設樣式），flex column gap 14px，hover `opacity:0.85`：圖 1:1 cover 圓角 4px 底 `#E9E0D3`；分類 13px 700 ls 0.15em `#9A5B2E`；標題 Serif 700 `clamp(15px,2vw,18px)` lh 1.5。
- 點擊開啟 **WorkModal**。資料與順序見 `content/works.json`（8 筆）。

### 7.5 WorkModal
- 遮罩 fixed inset 0 z 50 `rgba(20,15,10,0.7)`，flex 置中 padding 20px；**點遮罩關閉、Esc 關閉、點內容不關閉**。
- 面板 `#F6F1EA` max-width 920px、width 100%、max-height 90vh、overflow auto、圓角 6px；grid `repeat(auto-fit,minmax(min(100%,320px),1fr))`（桌機左右、手機上下）。
- 圖：100% 寬高、min-height 240px、max-height 50vh、cover。
- 文字欄 padding `clamp(20px,5vw,32px)` flex column gap 16px：上排分類（同卡片）+ 「×」關閉鈕 24px；標題 Serif 900 24px lh 1.5；內文 15px lh 1.9 `#4A3C30` `white-space:pre-line`；CTA「我也想做這種模具 → LINE 詢問」綠 pill 16px padding 14px 24px 置中 mt 8px。
- 建議補：開啟時鎖 body 捲動、`role="dialog" aria-modal`、焦點移入。

### 7.6 綠色 CTA 帶
- 全寬 `#06C755` 白字；padding `clamp(40px,8vw,56px) 20px`，flex wrap 兩端 gap 24px。
- 「想提升品牌競爭力？」Serif 900 `clamp(24px,3vw,34px)`；「傳一張手稿或 Logo 給我們，免費幫您生成構圖。」17px。
- 白鈕「LINE 傳給我們 →」白底 `#0A7A3A` 字 700 17px padding 16px 28px；hover 底 `#2A211B` 白字。

### 7.7 服務流程 `#process`
- padding 同作品集；Eyebrow「服務流程」+ H2「從想法到第一個模具」（mb 48px）。
- grid `repeat(auto-fit,minmax(220px,1fr))` gap `0 32px`，上框 1px `#2A211B`；每步 padding 28px 0、下框 1px `#E4DACB`、flex column gap 12px：編號 Serif 900 40px（01 為 `#06C755`，其餘 `#2A211B`）、標題 20px 700、說明 15px lh 1.8 `#5A4A3C`。
  1. LINE 提供想法 — 手稿、Logo、創意圖案都可以，我們免費幫您生成構圖。
  2. 3D 建模 — 將平面圖像轉為立體造型，細節確認後再進入製作。
  3. 模樣列印 — 列印實體模樣，確認比例與造型還原度。
  4. 矽膠翻模交付 — 可用於食品、香氛、石膏等領域，小量客製也能做。
- 下方流程圖 100% 寬、mt 48px、圓角 4px。

### 7.8 關於我們 `#about`
- 全寬 `#EDE4D7`；內層 padding 同上，grid `minmax(min(100%,420px),1fr)` gap 56px align center。
- 左圖 1:1 cover 圓角 4px。右欄 gap 20px：Eyebrow「關於我們」；H2「專為設計師與品牌主提供「造型模具開發」的專業團隊」Serif 900 `clamp(28px,3.6vw,42px)` lh 1.4 balance；兩段 16px lh 2 `#4A3C30`（全文見 reference）。

### 7.9 常見問題 `#faq`
- Eyebrow「常見問題」+ H2「下單前你可能想知道」（mb 40px）；grid `minmax(min(100%,420px),1fr)` gap 24px，兩張圖（FAQ 圖、檢驗報告）圓角 4px。

### 7.10 聯絡 `#contact`
- 全寬 `#2A211B`；padding `clamp(64px,12vw,112px) 20px 48px`，置中 column gap 24px。
- Eyebrow「立即聯繫我們」（色 `#7FE3A6`）；H2「帶著想法來，<br>我們幫你做出第一個模具」Serif 900 `clamp(34px,5vw,60px)` lh 1.3；段落 17px `#CFC2B0`「若您有任何想法與需求，我們免費幫您生成構圖。」
- 主鈕「加入 LINE@ 免費構圖 →」綠 700 `clamp(17px,4vw,20px)` padding 18px 32px + 綠陰影。
- 資訊列（mt 40px pt 28px 上框 1px `#4A3C30`，15px `#CFC2B0`，gap `12px 36px`）：「工作時間：平日一到五 09:30–20:30」、`tel:0921967841`「0921-967-841」（`#F6F1EA`）。**不放 Email、不放 Facebook。**
- 版權「© 2025 Hank 藝術模具」13px `#8C7C6A`。

### 7.11 浮動 LINE 鈕
- fixed right 16px bottom 16px z 30，60×60 圓形 `#06C755`，白字「LINE」900 14px，陰影見 tokens；hover `#05B04B`。
- 用 prop/設定 `floatingLine`（預設 true）控制顯示。

## 8. 互動 & 狀態
- 狀態：`activeWorkIndex: number | null`、`viewportWidth`（僅用於 header nav >820px；實作建議改 CSS `@media (min-width:821px)`）。
- 所有錨點平滑捲動；sticky header 會遮住區塊標題 → 每個 section 加 `scroll-margin-top: 72px`。
- 所有 LINE 連結 `target="_blank" rel="noopener"`，點擊時呼叫 `trackLine(source, workSlug?)` 寫入 Supabase `line_clicks`（用 `navigator.sendBeacon` 或 fire-and-forget，不可阻擋跳轉）。source 值：`header | hero | band | work-modal | contact | floating`。
- 無表單、無登入。

## 9. 素材（全部來自原網站，請下載自存）
Base：`https://747537af2e.cbaul-cdnwnd.com/d62f44d9462f1d82ee3eabf8f38688c9/`（每個網址後加 `?ph=747537af2e`）
| 用途 | 路徑 |
|---|---|
| Hero | `200000002-70b7e70b80/messageImage_1750059991691.jpeg` |
| 關於我們 | `200000062-8998c8998e/ChatGPT%20Image%202025%E5%B9%B46%E6%9C%8820%E6%97%A5%20%E4%B8%8B%E5%8D%8804_37_52.png` |
| 流程圖 | `200000161-c65fac65fc/Desktop%20-%201-1.png` |
| FAQ | `200000165-1635f16362/Slide%2016_9%20-%205.png` |
| 檢驗報告 | `200000163-220792207b/HTF25400271M01_page-0001.jpeg` |
| 作品 ×8 | 見 `content/works.json` 的 `img`（`local` 為建議存放檔名） |

圖片用 `next/image`，Hero 設 `priority`；在 `next.config` 加 Supabase Storage 網域到 `images.remotePatterns`。

## 10. 部署步驟
1. `npx create-next-app@latest hank-art-molds --ts --app` → 實作 → push 到 GitHub。
2. Supabase：新專案 → SQL Editor 執行 `supabase/schema.sql` → 建 public bucket `works` → 上傳 8 張作品圖（檔名同 `image_path`）及其他 5 張素材。
3. Vercel：Import GitHub repo → 設環境變數 → Deploy → 綁自訂網域。
4. 驗收：375 / 768 / 1280 px 與 reference 逐區比對；點每顆 LINE 鈕確認 `line_clicks` 有寫入；Lighthouse Mobile Performance ≥ 90。

## 11. 檔案清單
- `reference/index.dc.html` — 設計稿（視覺真實來源）
- `reference/support.js` — 讓設計稿可在瀏覽器開啟的執行檔（不需移植）
- `content/works.json` — 作品集文案與圖片
- `supabase/schema.sql` — 資料表、RLS、初始資料
