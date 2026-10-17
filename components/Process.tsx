import Image from "next/image";

const STEPS = [
  { no: "01", title: "LINE 提供想法", desc: "手稿、Logo、創意圖案都可以，我們免費幫您生成構圖。" },
  { no: "02", title: "3D 建模", desc: "將平面圖像轉為立體造型，細節確認後再進入製作。" },
  { no: "03", title: "模樣列印", desc: "列印實體模樣，確認比例與造型還原度。" },
  { no: "04", title: "矽膠翻模交付", desc: "可用於食品、香氛、石膏等領域，小量客製也能做。" },
];

export default function Process() {
  return (
    <section id="process" className="sec safe-x">
      <div className="process-head">
        <span className="eyebrow">服務流程</span>
        <h2 className="h2 serif">從想法到第一個模具</h2>
      </div>
      <div className="steps">
        {STEPS.map((s, i) => (
          <div key={s.no} className="step">
            <span className={`step-no serif${i === 0 ? " first" : ""}`}>{s.no}</span>
            <span className="step-title">{s.title}</span>
            <span className="step-desc">{s.desc}</span>
          </div>
        ))}
      </div>
      <Image
        src="/images/process.png"
        alt="客製化服務流程"
        width={1476}
        height={907}
        sizes="(max-width: 1200px) calc(100vw - 40px), 1160px"
        className="process-img"
      />
    </section>
  );
}
