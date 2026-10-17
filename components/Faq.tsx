import Image from "next/image";

export default function Faq() {
  return (
    <section id="faq" className="sec safe-x">
      <div className="faq-head">
        <span className="eyebrow">常見問題</span>
        <h2 className="h2 serif">下單前你可能想知道</h2>
      </div>
      <div className="faq-grid">
        <Image
          src="/images/faq.png"
          alt="常見問題"
          width={1920}
          height={1803}
          sizes="(max-width: 904px) calc(100vw - 40px), 568px"
          className="faq-img"
        />
        <Image
          src="/images/inspection-report.jpeg"
          alt="檢驗報告"
          width={1241}
          height={1755}
          sizes="(max-width: 904px) calc(100vw - 40px), 568px"
          className="faq-img"
        />
      </div>
    </section>
  );
}
