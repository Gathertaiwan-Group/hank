import Image from "next/image";
import LineLink from "@/components/LineLink";
import { CTA_MAIN, CTA_REASSURE } from "@/lib/site";

const TAGS = ["甜點", "冰棒", "巧克力", "慕斯蛋糕", "糖果", "肥皂", "擴香石"];

export default function Hero() {
  return (
    <section id="top" className="hero safe-x">
      <div className="hero-text">
        <span className="eyebrow">客製化矽膠模具</span>
        <h1 className="hero-h1 display">
          一張手稿，
          <br />
          做出<span className="mark">品牌專屬</span>模具
        </h1>
        <p className="hero-p">巧克力、甜點、冰棒、肥皂、擴香石都能做。照片或手稿就能開始，小量客製也接。</p>
        <ul className="facts">
          <li>
            開發費約 <strong>3,000–5,000 元</strong>（一次性）
          </li>
          <li>
            模具每個約 <strong>400–1,500 元</strong>
          </li>
          <li>
            整體約 <strong>21 天</strong>寄出
          </li>
          <li>
            <strong>4 個月內</strong>重做同款，不用再付開發費
          </li>
        </ul>
        <p className="facts-note">實際金額依數量與難易度報價</p>
        <div className="tags">
          {TAGS.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
        <div className="hero-ctas">
          <div className="cta-stack">
            <LineLink source="hero" className="btn-cta btn-hero">
              {CTA_MAIN} →
            </LineLink>
            <span className="reassure">{CTA_REASSURE}</span>
          </div>
          <a href="#works" className="link-under hit">
            先看作品
          </a>
        </div>
      </div>
      <div className="hero-media">
        <Image
          src="/images/hero.jpeg"
          alt="客製化矽膠模具"
          width={1024}
          height={1024}
          priority
          fetchPriority="high"
          sizes="(max-width: 940px) calc(100vw - 40px), 572px"
          className="hero-img"
        />
        <div className="hero-card">
          有想法就好 —
          <br />
          <strong>傳張圖片，聊聊你的模具想法</strong>
        </div>
      </div>
    </section>
  );
}
