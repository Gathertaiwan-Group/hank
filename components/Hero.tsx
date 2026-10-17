import Image from "next/image";
import LineLink from "@/components/LineLink";
import { SITE_DESCRIPTION } from "@/lib/site";

const TAGS = ["甜點", "冰棒", "巧克力", "慕斯蛋糕", "糖果", "肥皂", "擴香石"];

export default function Hero() {
  return (
    <section id="top" className="hero safe-x">
      <div className="hero-text">
        <span className="eyebrow">客製化矽膠模具</span>
        <h1 className="hero-h1 serif">
          創做屬於
          <br />
          你品牌的特色
        </h1>
        <p className="hero-p">{SITE_DESCRIPTION}</p>
        <div className="tags">
          {TAGS.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
        <div className="hero-ctas">
          <LineLink source="hero" className="btn-line btn-hero">
            加入 LINE@ 免費構圖 →
          </LineLink>
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
          sizes="(max-width: 940px) calc(100vw - 40px), 572px"
          className="hero-img"
        />
        <div className="hero-card">
          有想法就好 —
          <br />
          <strong>我們免費幫您生成構圖</strong>
        </div>
      </div>
    </section>
  );
}
