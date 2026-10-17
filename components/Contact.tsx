import LineLink from "@/components/LineLink";

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact-inner safe-x">
        <span className="eyebrow contact-eyebrow">立即聯繫我們</span>
        <h2 className="contact-h2 serif">
          帶著想法來，
          <br />
          我們幫你做出第一個模具
        </h2>
        <p className="contact-p">若您有任何想法與需求，我們免費幫您生成構圖。</p>
        <LineLink source="contact" className="btn-line btn-contact">
          加入 LINE@ 免費構圖 →
        </LineLink>
        <div className="contact-info">
          <span>工作時間：平日一到五 09:30–20:30</span>
        </div>
        <span className="copyright">© 2025 Hank 藝術模具</span>
      </div>
    </section>
  );
}
