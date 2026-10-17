import LineLink from "@/components/LineLink";

export default function CtaBand() {
  return (
    <section className="band" aria-label="免費構圖">
      <div className="band-inner safe-x">
        <div className="band-text">
          <span className="band-title serif">想提升品牌競爭力？</span>
          <span className="band-sub">傳一張手稿或 Logo 給我們，免費幫您生成構圖。</span>
        </div>
        <LineLink source="band" className="btn-white">
          LINE 傳給我們 →
        </LineLink>
      </div>
    </section>
  );
}
