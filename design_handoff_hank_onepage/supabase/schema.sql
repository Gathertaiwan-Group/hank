-- Hank 藝術模具 — Supabase schema
-- 1) works：作品集內容（可在 Supabase 後台增修，不必改程式）
create table if not exists public.works (
  id          bigint generated always as identity primary key,
  slug        text unique not null,
  sort_order  int  not null default 0,
  cat         text not null,
  title       text not null,
  body        text not null,          -- 用 \n 分段，前端以 white-space:pre-line 顯示
  image_path  text not null,          -- Supabase Storage bucket "works" 內路徑，或 /public 路徑
  published   boolean not null default true,
  created_at  timestamptz not null default now()
);

-- 2) line_clicks：追蹤每顆 LINE CTA 的點擊（轉換分析）
create table if not exists public.line_clicks (
  id          bigint generated always as identity primary key,
  source      text not null,          -- header | hero | band | work-modal | contact | floating
  work_slug   text,                   -- 從作品彈窗點擊時記錄
  referrer    text,
  user_agent  text,
  created_at  timestamptz not null default now()
);

alter table public.works       enable row level security;
alter table public.line_clicks enable row level security;

create policy "public read published works" on public.works
  for select using (published = true);

create policy "anon insert clicks" on public.line_clicks
  for insert to anon with check (char_length(source) <= 32);

-- Storage：建立 public bucket "works"，上傳 content/works.json 對應圖片
-- insert into storage.buckets (id, name, public) values ('works','works', true);

-- 初始資料（與設計稿一致，順序 1–8）
insert into public.works (slug, sort_order, cat, title, body, image_path) values
('chocolate',1,'造型巧克力','打造專屬品牌印象，一模就能記住你！',E'這是一款為品牌客戶量身設計的「酒瓶造型巧克力模具」，不論是聯名禮盒、開店週年紀念、活動限量甜點，\n我們都能協助你將創意變成立體可食用的現實。讓你的甜點禮盒增加話題性與記憶點。','01-chocolate.jpeg'),
('mousse',2,'造型慕斯蛋糕','手工製作與訂製',E'想讓你的甜點不只好吃，還能讓人一眼就記住？我們為品牌打造專屬圖騰模具，讓每個甜點都能展現獨特細節與高級質感。\n造型甜點不只吸睛，更能創造門市「打卡亮點」，成為社群曝光利器，讓客人主動分享、為你做口碑。','02-mousse.png'),
('pudding',3,'奶酪布丁甜點','可愛造型 × 味覺記憶 × 打卡吸睛',E'這款奶酪布丁結合【角色造型＋模具細節還原】，可愛的立體造型，不只吸引小朋友與親子族群，更是餐廳與甜點品牌的打卡亮點。\n模具皆可依角色、動物、品牌主題進行客製設計，搭配焦糖、果凍、布丁、慕斯等應用形式。','03-pudding.jpeg'),
('aroma-stone',4,'造型擴香石','香氣與造型並存，是最柔軟的品牌記憶',E'專為品牌打造的擴香石，不只是香氛，更是一份視覺與氣味共同傳遞的「空間名片」。\n適用於咖啡廳、選物店、香氛品牌聯名、小量開發與開幕贈禮。造型＋香氛＋識別設計，一次到位，讓客人一聞就記得你。','04-aroma-stone.jpeg'),
('winter-melon-candy',5,'造型冬瓜糖','百年風味 × 客製創意 × 品牌聯名禮盒',E'來自台南老字號「義豐冬瓜茶」的特製品牌禮盒，將傳承一甲子的冬瓜風味，結合專屬設計的造型冬瓜糖，以品牌圖像與文字雕刻打造專屬模具。\n適合節慶贈禮、企業聯名、品牌通路推廣。','05-winter-melon-candy.jpeg'),
('popsicle',6,'聯名造型冰棒','在地文化 × 造型甜點 × 冰品文創化',E'冰棒不只是消暑點心，更可以是一份會融化的藝術品。將地標建築、LOGO 圖騰、角色造型通通立體呈現，讓每一支冰棒都能說故事。\n適合觀光景點、甜點品牌、觀光工廠、文創門市、品牌聯名禮盒開發。','06-popsicle.jpeg'),
('soap',7,'創意手工肥皂','可洗的造型 × 可療癒的日常',E'這款貓頭鷹造型肥皂，結合品牌設計、天然成分與客製模具，讓每一塊手工皂都成為獨一無二的禮物。\n模具可客製 LOGO、角色、公仔或主題圖樣，適用於透明皂、蜂蠟皂、冷製皂等多種皂類製程。','07-soap.png'),
('red-tortoise-cake',8,'造型紅龜糕','文化創意結合傳統美食',E'這款作品結合了原住民文化圖紋與造型語彙，將傳統點心轉化為富有文化溫度與現代識別度的創意甜品。\n適合文創展售、觀光工廠、品牌聯名與節慶活動禮盒開發。','08-red-tortoise-cake.jpeg')
on conflict (slug) do nothing;
