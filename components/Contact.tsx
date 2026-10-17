import QRCode from "qrcode";
import LineLink from "@/components/LineLink";
import { CTA_MAIN, CTA_REASSURE, LINE_URL } from "@/lib/site";

const CHECKLIST = [
  "三視圖（照片或手稿都可以）",
  "尺寸：長、寬、高、厚度",
  "用途：巧克力、甜點、皂、擴香石……",
  "預計數量",
  "要放 LOGO：請附 AI 檔",
];

export default async function Contact() {
  // 只在桌機顯示（CSS 控制）；手機直接點按鈕
  const qrSvg = await QRCode.toString(LINE_URL, {
    type: "svg",
    margin: 1,
    errorCorrectionLevel: "M",
    color: { dark: "#2A211B", light: "#FFFFFF" },
  });

  return (
    <section id="contact" className="contact">
      <div className="contact-inner safe-x">
        <span className="eyebrow contact-eyebrow">傳圖估價</span>
        <h2 className="contact-h2 serif">
          帶著想法來，
          <br />
          <span className="nb">我們幫你</span>
          <span className="nb">做出第一個模具</span>
        </h2>
        <div className="contact-body">
          <div className="contact-main">
            <p className="contact-p">傳圖時附上這些，比較好報價：</p>
            <ul className="checklist">
              {CHECKLIST.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <LineLink source="contact" className="btn-line btn-contact">
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
          <span>服務時間：平日週一到週五 09:30–20:30</span>
        </div>
        <span className="copyright">© 2026 Hank 藝術模具</span>
      </div>
    </section>
  );
}
