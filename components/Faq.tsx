import Image from "next/image";
import type { ReactNode } from "react";
import LineLink from "@/components/LineLink";

/** 內容只取自 FAQ 圖（public/images/faq.png）與流程圖的業主原文，見 docs/copy-research.md §4 */
const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "大概要多少錢？",
    a: (
      <>
        <p>費用分兩部分：</p>
        <ul>
          <li>
            開發費（3D 建模＋3D 列印）：約 <strong>3,000–5,000 元</strong>。尺寸、圖案不再修改的話，只收一次。
          </li>
          <li>
            模具：每個約 <strong>400–1,500 元</strong>，依數量與難易度報價。
          </li>
        </ul>
        <p>我們建議先找公版模具，找不到合適的再客製。</p>
      </>
    ),
  },
  {
    q: "多久可以拿到模具？",
    a: (
      <>
        <ul>
          <li>3D 建模：約 7 天內提供初稿。修改多或造型較難，時間會增加。</li>
          <li>3D 母模列印：約 5–7 天。</li>
          <li>矽膠翻模：約 5–7 天。</li>
        </ul>
        <p>
          整體約 <strong>21 天</strong>寄出。
        </p>
      </>
    ),
  },
  {
    q: "我只有手稿，可以做嗎？",
    a: (
      <p>
        可以。請提供平面三視圖（照片或手稿都可以），並標註長、寬、高、厚度，我們就能報價。要放 LOGO 請提供 AI 檔。
      </p>
    ),
  },
  {
    q: "什麼時候要付錢？",
    a: <p>估價不用先付款。確認細節、收到報價後，再付報價的 50% 訂金。</p>,
  },
  {
    q: "之後想再做一樣的模具呢？",
    a: (
      <p>
        3D 母模會放在工廠控溫控濕保存 4 個月。<strong>4 個月內</strong>再做同款，不用再付開發費；4 個月內沒有再製作或告知，母模會銷毀。
      </p>
    ),
  },
  {
    q: "模具耐熱嗎？可以蒸、烤嗎？",
    a: (
      <p>
        我們使用鉑金進口矽膠，可蒸、烤、烘，耐高溫 250°C 約半小時，但不可直接火燒。正常使用可以重複使用兩年以上。
      </p>
    ),
  },
];

export default function Faq() {
  return (
    <section id="faq" className="sec safe-x">
      <div className="faq-head">
        <span className="eyebrow">常見問題</span>
        <h2 className="h2 display">下單前你可能想知道</h2>
      </div>
      <div className="faq-layout">
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <details key={f.q} className="faq-item" open={i === 0}>
              <summary className="faq-q">{f.q}</summary>
              <div className="faq-a">{f.a}</div>
            </details>
          ))}
          <div className="faq-cta">
            <span className="sec-cta-title">還有其他問題？</span>
            <LineLink source="faq" className="btn-cta btn-sec">
              LINE 直接問 →
            </LineLink>
            <span className="reassure">服務時間：平日 09:30–20:30</span>
          </div>
        </div>
        <figure className="report">
          <Image
            src="/images/inspection-report.jpeg"
            alt="SGS 測試報告第 1 頁（報告編號 HTF25400271M01）"
            width={1241}
            height={1755}
            sizes="(max-width: 904px) min(calc(100vw - 40px), 320px), 320px"
            className="report-img"
          />
          <figcaption className="report-cap">SGS 測試報告（節錄第 1 頁）</figcaption>
        </figure>
      </div>
    </section>
  );
}
