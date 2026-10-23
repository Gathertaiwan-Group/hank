import Image from "next/image";
import LineLink from "@/components/LineLink";
import { CTA_MAIN } from "@/lib/site";

/** 與 public/images/process.png 的 5 步一致（docs/copy-v2.md §7） */
const STEPS = [
  { no: "01", title: "了解費用與時間", desc: "先看下方「常見問題」的價格與天數，或直接 LINE 問。" },
  { no: "02", title: "提供圖片需求", desc: "傳三視圖（照片或手稿都可以），標註長、寬、高、厚度。要放 LOGO 請附 AI 向量檔。" },
  { no: "03", title: "報價與下訂", desc: "確認細節後我們提供報價，你同意後再付報價的 50% 訂金。" },
  { no: "04", title: "3D 檔案對稿", desc: "約 7 天內提供 3D 初稿，跟你確認造型。修改多或造型較難，時間會增加。" },
  { no: "05", title: "正式開始製作", desc: "3D 母模列印約 5–7 天，矽膠翻模約 5–7 天，整體約 21 天寄出。" },
];

export default function Process() {
  return (
    <section id="process" className="sec safe-x">
      <div className="process-head">
        <span className="eyebrow">服務流程</span>
        <h2 className="h2 h2-balance display">
          從傳圖到收到模具：
          <br />5 個步驟
        </h2>
      </div>
      <ol className="steps">
        {STEPS.map((s, i) => (
          <li key={s.no} className="step">
            <span className={`step-no display${i === 0 ? " first" : ""}`}>{s.no}</span>
            <span className="step-title">{s.title}</span>
            <span className="step-desc">{s.desc}</span>
          </li>
        ))}
      </ol>
      <div className="sec-cta">
        <span className="sec-cta-title">第 2 步可以現在就開始</span>
        <LineLink source="process" className="btn-cta btn-sec">
          {CTA_MAIN} →
        </LineLink>
        <span className="reassure">估價免費，確認報價後才付訂金</span>
      </div>
      <Image
        src="/images/process.png"
        alt="客製化服務流程：了解客製成本、提供圖片需求、報價與下訂、3D 檔案對稿、正式開始製作"
        width={1476}
        height={907}
        sizes="(max-width: 1200px) calc(100vw - 40px), 1160px"
        className="process-img"
      />
    </section>
  );
}
