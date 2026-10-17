-- Hank 藝術模具 — 0002_copy_v2
-- 文案 v2（docs/copy-v2.md）：更新 8 則作品 title/body；line_clicks insert policy 加入 process、faq 兩個 source。
-- 只動 hank schema。由 scripts/apply-migrations.mjs 套用（同一交易）。

update hank.works set title = E'酒瓶造型巧克力模具', body = E'為品牌客戶做的酒瓶造型巧克力模具，把品牌的造型做成可以吃的巧克力。\n適合聯名禮盒、開店週年、活動限量甜點。' where slug = 'chocolate';
update hank.works set title = E'品牌圖騰慕斯蛋糕模具', body = E'把品牌專屬圖騰做進慕斯蛋糕的模具，甜點一上桌就看得出是哪一家。\n適合門市招牌甜點、新品與打卡款。' where slug = 'mousse';
update hank.works set title = E'角色造型奶酪布丁模具', body = E'立體角色造型的奶酪布丁模具，細節照原圖還原。\n角色、動物、品牌主題都能客製，也能用在焦糖、果凍、布丁、慕斯。適合餐廳、甜點品牌與親子客群。' where slug = 'pudding';
update hank.works set title = E'品牌造型擴香石模具', body = E'把品牌識別做成擴香石的造型，香味和外型一起留給客人。\n適合咖啡廳、選物店、香氛品牌聯名、開幕贈禮，小量開發也可以。' where slug = 'aroma-stone';
update hank.works set title = E'義豐冬瓜茶：造型冬瓜糖模具', body = E'為台南老字號「義豐冬瓜茶」品牌禮盒做的造型冬瓜糖模具，把品牌圖像和文字刻進模具裡。\n適合節慶贈禮、企業聯名、通路推廣。' where slug = 'winter-melon-candy';
update hank.works set title = E'地標與 LOGO 造型冰棒模具', body = E'地標建築、LOGO 圖騰、角色造型，都能做成立體冰棒。\n適合觀光景點、觀光工廠、甜點品牌、文創門市與聯名禮盒。' where slug = 'popsicle';
update hank.works set title = E'貓頭鷹造型手工皂模具', body = E'貓頭鷹造型的手工皂模具，LOGO、角色、公仔或主題圖樣都能客製。\n可用於透明皂、蜂蠟皂、冷製皂等皂類。' where slug = 'soap';
update hank.works set title = E'原住民圖紋紅龜糕模具', body = E'把原住民文化圖紋做進紅龜糕的模具，讓傳統點心也有自己的識別。\n適合文創展售、觀光工廠、品牌聯名與節慶禮盒。' where slug = 'red-tortoise-cake';

drop policy if exists "anon insert clicks" on hank.line_clicks;
create policy "anon insert clicks" on hank.line_clicks
  for insert to anon, authenticated
  with check (char_length(source) <= 32 and source in ('header','hero','band','work-modal','process','faq','contact','floating'));
