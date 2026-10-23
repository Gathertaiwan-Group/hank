import Image from "next/image";
import QRCode from "qrcode";
import LineLink from "@/components/LineLink";
import { CTA_MAIN, CTA_REASSURE, LINE_URL, SITE_NAME } from "@/lib/site";

/** 與官方 LINE 歡迎訊息「詢問報價，請提供」的 5 項一致 */
const CHECKLIST: { item: string; hint: string }[] = [
  { item: "參考圖片", hint: "照片或手稿都可以，有三視圖更好" },
  { item: "尺寸", hint: "長、寬、高、厚度" },
  { item: "用途與材料", hint: "巧克力、甜點、皂、擴香石……" },
  { item: "模具數量", hint: "" },
  { item: "希望完成日期", hint: "" },
];

export default async function Contact() {
  // 只在桌機顯示（CSS 控制）；手機直接點按鈕
  const qrSvg = await QRCode.toString(LINE_URL, {
    type: "svg",
    margin: 1,
    errorCorrectionLevel: "M",
    color: { dark: "#202A35", light: "#FFFFFF" },
  });

  return (
    <section id="contact" className="contact">
      <div className="contact-inner safe-x">
        <span className="eyebrow contact-eyebrow">傳圖估價</span>
        <span className="tagline" lang="en">
          Mogu Your Idea!
          <svg viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path d="M4 9 C 60 3, 140 1, 196 5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </span>
        <h2 className="contact-h2 display">
          帶著想法來，
          <br />
          <span className="nb">我們幫你</span>
          <span className="nb">做出第一個模具</span>
        </h2>
        <div className="contact-body">
          <div className="contact-main">
            <p className="contact-p">傳張圖片，聊聊你的模具想法。附上這些，比較好報價：</p>
            <ol className="checklist">
              {CHECKLIST.map((c) => (
                <li key={c.item}>
                  {c.item}
                  {c.hint && <span className="ck-hint">（{c.hint}）</span>}
                </li>
              ))}
            </ol>
            <LineLink source="contact" className="btn-cta btn-contact">
              {CTA_MAIN} →
            </LineLink>
            <span className="reassure reassure-dark">{CTA_REASSURE}</span>
          </div>
          <div className="contact-qr">
            <div className="qr-box" role="img" aria-label="LINE 官方帳號 QR Code" dangerouslySetInnerHTML={{ __html: qrSvg }} />
            <span className="qr-cap">用電腦看？拿手機 LINE 掃描加入</span>
          </div>
        </div>
        <div className="contact-info">
          <div className="brand-foot">
            <Image src="/brand/mark.png" alt="" width={512} height={512} sizes="48px" className="brand-tile" />
            <span className="brand-name">
              <strong>{SITE_NAME}</strong>
              <span>客製化矽膠模具開發</span>
            </span>
          </div>
          <span>服務時間：平日週一到週五 09:30–20:30</span>
        </div>
        <span className="copyright">© 2026 {SITE_NAME}</span>
      </div>
    </section>
  );
}
